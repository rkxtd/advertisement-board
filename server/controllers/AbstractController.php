<?php
require_once __DIR__ . '/../utils/db.php';
use \RestServer\RestException;

class AbstractController
{
    protected $table = null;
    protected $db;
    function __construct()
    {
        $this->db = Db::getInstance();
        if (!$this->table) {
            throw new Exception('Database table should be specified');
        }
    }

    /**
     * Gets the element by id
     *
     * @url GET /
     * @url GET /$id
     */
    public function get($id = null)
    {
        try {
            if ($id) {
                $this->db->select($this->table, '*', ['id'=> $id]);
                if ($data = $this->db->fetch()) {
                    return $data;
                } else {
                    throw new Exception('Element with id `#' . $id . '` not found in the DataBase. Table: ' . $this->table);
                }
            } else {
                return $this->prepareResponse($this->db->select($this->table)->all());
            }
        } catch (Exception $e) {
            throw new RestException(500, $e->getMessage());
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

            $this->db->select($this->table, '*', ['id'=> $id]);
            if (!$this->db->fetch()) {
                throw new Exception('Element with id `#' . $id . '` not found in the DataBase');
            }

            $this->db->delete($this->table, $id);

            return $this->prepareResponse(['id' => $id, 'status' => 'deleted', 'table' => $this->table]);
        } catch (Exception $e) {
            throw new RestException(500, $e->getMessage());
        }
    }

    protected function prepareResponse($responseObject) {
        return [
            'status'    => 'ok',
            'items'     => $responseObject
        ];
    }
}