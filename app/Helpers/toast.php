<?php

if (! function_exists('toast')) {
    function toast($message, $type = 'success', $title = null)
    {
        session()->flash('toast', [
            'message' => $message,
            'type' => $type,
            'title' => $title,
        ]);
    }

    function toastSuccess($message, $title = null)
    {
        toast($message, 'success', $title);
    }

    function toastError($message, $title = null)
    {
        toast($message, 'error', $title);
    }

    function toastWarning($message, $title = null)
    {
        toast($message, 'warning', $title);
    }

    function toastInfo($message, $title = null)
    {
        toast($message, 'info', $title);
    }
}
