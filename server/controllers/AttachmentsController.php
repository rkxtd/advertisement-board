<?php
require_once __DIR__ . '/AbstractController.php';
require_once __DIR__ . '/../vendor/autoload.php';

use Intervention\Image\ImageManager;
use RestServer\RestException;

class AttachmentsController extends AbstractController
{
    protected   $table = 'attachments';
    protected   $tableAdvertisement = 'advertisements';
    private     $thumbnailDimensions = ['75', '150', '225', '300'];
    /**
     * Saves an image to the database
     *
     * @url POST /
     */
    public function save($id = null, $data)
    {
        $date       = new DateTime();
        $data       = $_POST;
        $manager    = new ImageManager(array('driver' => 'imagick'));

        try {
            if (empty($data['advertisementId'])) {
                throw new Exception('Advertisement ID is required');
            }
            if(empty($_FILES['image'])) {
                throw new Exception('Image file is required');
            }
            if($_FILES['image']['error']) {
                throw new Exception('Error occured while image upload. Details: ' . $_FILES['image']['error']);
            }

            if (false === $ext = $this->getImageExtension($_FILES['image']['tmp_name'])) {
                throw new Exception('Invalid file format.');
            }

            $uploadedFilePath = sprintf('../../public/uploads/%s.%s.%s',
                sha1_file($_FILES['image']['tmp_name']),
                time(),
                $ext
            );

            if (!move_uploaded_file(
                $_FILES['image']['tmp_name'],
                $uploadedFilePath
            )) {
                throw new Exception('Failed to move uploaded file.');
            }

            $data['filepath'] = str_replace('..', '', $uploadedFilePath);
            $data['created'] = $date->format('Y-m-d H:i:s');

            $this->db->create($this->table, $data)->select($this->table, '*', ['id'=> $this->db->id()]);

            foreach ($this->thumbnailDimensions as $dimension) {
                $manager->make($uploadedFilePath)->resize($dimension, null, function ($constraint) {
                    $constraint->aspectRatio();
                })->save($this->getThumbnailPath($uploadedFilePath, $dimension));
            }

            return $this->db->fetch();
        } catch (Exception $e) {
            throw new RestException(401, $e->getMessage());
        }
    }

    /**
     * Deletes the element by id
     *
     * @url DELETE /$id
     */
    public function delete($id)
    {
        try {
            if (!$id) {
                throw new Exception('ID is required to delete element');
            }

            $image = $this->db->select($this->table, '*', ['id'=> $id])->fetch();

            if (!$image) {
                throw new Exception('Element with id `#' . $id . '` not found in the DataBase');
            }

            $originalImage = '..' . $image->filepath;

            foreach ($this->thumbnailDimensions as $dimension) {
                $this->removeFile($this->getThumbnailPath($originalImage, $dimension));
            }

            $this->removeFile($originalImage);

            return parent::delete($id);
        } catch (Exception $e) {
            throw new RestException(500, $e->getMessage());
        }
    }

    /**
     * Deletes the images by advertisement id
     */
    public function deleteByAdvertisementId($advId)
    {
        $response = [];
        try {
            if (!$advId) {
                throw new Exception('Image ID is required to delete element');
            }

            $images = $this->db->select($this->table, '*', ['advertisementId'=> $advId])->all();

            foreach ($images as $image) {
                $response[] = $this->delete($image->id);
            }

            return $response;
        } catch (Exception $e) {
            throw new RestException(500, $e->getMessage());
        }
    }

    private function getImageExtension($path) {
        $finfo = new finfo(FILEINFO_MIME_TYPE);

        return $ext = array_search(
            $finfo->file($path),
            array(
            'jpg' => 'image/jpeg',
            'png' => 'image/png',
            ),
            true
        );
    }

    private function getThumbnailPath($path, $size) {
        $ext = $this->getImageExtension($path);

        return str_replace('.' . $ext, '.' . $size . 'px.' . $ext, $path);
    }

    private function removeFile($path) {
        if (file_exists($path)) {
            unlink($path);
        }
    }
}