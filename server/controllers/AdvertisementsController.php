<?php
require_once __DIR__ . '/AbstractController.php';
use \RestServer\RestException;

const STATUS_CREATED = 'created';
const STATUS_PUBLISHED = 'published';

class AdvertisementsController extends AbstractController
{
    protected $table = 'advertisements';

    /**
     * Saves a adverttisement to the database
     *
     * @url POST /
     * @url PUT /$id
     */
    public function save($id = null, $data)
    {
        $date = new DateTime();
        try {
            if ($id) {
                $data['status'] = STATUS_PUBLISHED;
                if (empty($data['title'])) {
                    throw new Exception('Title is required');
                }
                if (empty($data['price'])) {
                    throw new Exception('Price is required');
                }
                if (empty($data['description'])) {
                    throw new Exception('Description is required');
                }
                $this->db->update($this->table, $data, $id);
                $this->db->select($this->table, '*', ['id'=> $id]);
            } else {
                if (empty($data['categoryId'])) {
                    throw new Exception('Category ID is required');
                }

                if (empty($data['userId'])) {
                    throw new Exception('User ID is required');
                }

                $data['created'] = $date->format('Y-m-d H:i:s');
                $data['status'] = STATUS_CREATED;
                $this->db->create($this->table, $data);
                $this->db->select($this->table, '*', ['id'=> $this->db->id()]);
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
        $ac = new AttachmentsController();
        try {
            $result = parent::delete($id);
            $ac->deleteByAdvertisementId($id);
            return $result;
        } catch (Exception $e) {
            throw new RestException(500, $e->getMessage());
        }
    }
}