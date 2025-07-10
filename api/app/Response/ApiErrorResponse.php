<?php

namespace App\Response;

use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\Response;
use Throwable;

class ApiErrorResponse implements Responsable
{
    public function __construct(
        protected Throwable $e,
        protected string $message,
        protected int $code = Response::HTTP_INTERNAL_SERVER_ERROR,
        protected array $headers = []
    ) {
    }

    public function toResponse($request)
    {
        $response = ['message' => $this->message];
        if ($this->e && config('app.debug')) {
            $response = [
                'message' => $this->e->getMessage(),
                'file' => $this->e->getFile(),
                'line' => $this->e->getLine(),
            ];
        }

        return response()->json(
            ['error' => $response],
            $this->code,
            $this->headers
        );
    }
}
