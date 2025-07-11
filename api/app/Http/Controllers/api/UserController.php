<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\api\UserResource;
use App\Models\User;
use App\Response\ApiErrorResponse;
use App\Response\ApiSuccessResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Throwable;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return new ApiSuccessResponse(new UserResource($user));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        try {
            $user->delete();
            return new ApiSuccessResponse(code: Response::HTTP_NO_CONTENT);
        } catch (Throwable $th) {
            return new ApiErrorResponse(
                $th,
                message: 'An error occured while processing request. Please try again.'
            );
        }
    }
}
