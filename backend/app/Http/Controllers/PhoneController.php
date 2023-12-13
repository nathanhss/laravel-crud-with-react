<?php

namespace App\Http\Controllers;

use App\Models\Phone;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class PhoneController extends Controller
{
    private readonly Phone $phone;
    private readonly User $user;

    public function __construct()
    {
        $this->phone = new Phone();
        $this->user = new User();
    }

    public function index()
    {
        try {
            $phones = $this->phone->all();
            return response()->json(['users' => $phones]);
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
            $data = $request->json()->all();

            $user = $this->user->find($data['user_id']);

            if ($user) {
                $phones = $data['phones'];

                foreach ($phones as $phone) {
                    $this->phone->create([
                        'user_id' => $user->id,
                        'number' => $phone,
                    ]);
                }

                return response()->json(['Message' => 'Phones added sucessfully']);
            }

            return response()->json(['Error' => 'User not found'], 404);
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
            $phoneById = $this->phone->find($id);

            if (!$phoneById) {
                return response()->json(['Error' => 'Phone not found'], 404);
            }

            return response()->json(['phone' => $phoneById]);
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
            $updated = $this->phone->where('id', $id)->update([
                'phone' => $request->input('phone')
            ]);

            if (!$updated) {
                return response()->json(['Error' => 'Error while updating phone']);
            }
            return response()->json(['Message' => 'Phone updated sucessfully']);
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
            $deleted = $this->phone->where('id', $id)->delete();

            if (!$deleted) {
                return response()->json(['error' => 'Phone not found'], 404);
            }

            return response()->json(['message' => 'Phone deleted sucessfully']);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Internal Server Error',
                'details' => $e
            ], 500);
        }
    }
}
