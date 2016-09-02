<?php
require_once __DIR__ . '/AbstractController.php';
use \RestServer\RestException;

class UsersController extends AbstractController
{
    protected $table = 'users';

    /**
     * Saves a user to the database
     *
     * @url POST /
     * @url PUT /$id
     */
    public function save($id = null, $data)
    {
        $date = new DateTime();
        try {
            if ($id) {
                if ($data['password']) {
                    $data['password'] = md5($data['password']);
                }
                $this->db->update($this->table, $data, $id);
                $this->db->select($this->table, '*', ['id'=> $id]);

            } else {
                $this->db->select($this->table, '*', ['username'=> $data['username']]);
                if ($this->db->fetch()) {
                    throw new Exception('Username `' . $data['username'] . '` is already taken');
                }
                if (empty($data['username'])) {
                    throw new Exception('Username is required');
                }
                if (empty($data['password'])) {
                    throw new Exception('Password is required');
                }

                $data['created'] = $date->format('Y-m-d H:i:s');
                $data['password'] = md5($data['password']);
                $this->db->create($this->table, $data);
                $this->db->select($this->table, '*', ['username'=> $data['username']]);
            }

            return $this->db->fetch();
        } catch (Exception $e) {
            throw new RestException(401, $e->getMessage());
        }
    }
}