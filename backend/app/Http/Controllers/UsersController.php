<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public readonly User $user;

    public function __construct()
    {
        $this->user = new User();
    }

    public function index()
    {
        try {
            $users = $this->user->all();
            return response()->json(['users' => $users]);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Internal Server Error',
                'details' => $e
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {

            if ($this->user->where('document', $request->input('document'))->exists()) {
                return response()->json([
                    'message' => 'document already registered',
                ], 400);
            }

            $storedUser = $this->user->create([
                'name' => $request->input('name'),
                'document' => $request->input('document')
            ]);

            return response()->json(['response' => $storedUser]);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Internal Server Error',
                'details' => $e
            ], 500);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Internal Server Error',
                'details' => $e
            ], 500);
        }
    }

    public function show(string $id)
    {
        try {
            $userById = $this->user->find($id);
            if (!$userById) {
                return response()->json(['Error' => 'User not found'], 404);
            }
            return response()->json(['user' => $userById]);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Internal Server Error',
                'details' => $e
            ], 500);
        }
    }

    public function update(Request $request, string $id)
    {
        try {
            $updated = $this->user->where('id', $id)->update([
                'name' => $request->input('name'),
                'document' => $request->input('document')
            ]);

            if (!$updated) {
                return response()->json(['Error' => 'Error while updating user']);
            }
            return response()->json(['Message' => 'User updated sucessfully']);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Internal Server Error',
                'details' => $e
            ], 500);
        }
    }

    public function destroy(string $id)
    {
        try {
            $deleted = $this->user->where('id', $id)->delete();

            if (!$deleted) {
                return response()->json(['error' => 'user not found'], 404);
            }

            return response()->json(['message' => 'user deleted sucessfully']);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Internal Server Error',
                'details' => $e
            ], 500);
        }
    }
}
