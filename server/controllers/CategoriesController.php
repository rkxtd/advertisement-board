<?php
require_once __DIR__ . '/AbstractController.php';
use \RestServer\RestException;

class CategoriesController extends AbstractController
{
    protected $table = 'categories';

    /**
     * Saves a category to the database
     *
     * @url POST /
     * @url PUT /$id
     */
    public function save($id = null, $data)
    {
        $date = new DateTime();
        try {
            if ($id) {
                $this->db->update($this->table, $data, $id);
                $this->db->select($this->table, '*', ['id'=> $id]);

            } else {
                $this->db->select($this->table, '*', ['name'=> $data['name']]);
                if ($this->db->fetch()) {
                    throw new Exception('Category `' . $data['name'] . '` is already exists');
                }
                if (empty($data['name'])) {
                    throw new Exception('Name of the category is required');
                }

                $data['created'] = $date->format('Y-m-d H:i:s');
                $this->db->create($this->table, $data);
                $this->db->select($this->table, '*', ['name'=> $data['name']]);
            }

            return $this->db->fetch();
        } catch (Exception $e) {
            throw new RestException(401, $e->getMessage());
        }
    }
}