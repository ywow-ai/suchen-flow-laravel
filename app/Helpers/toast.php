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

    function toastSuccess($message, $title = 'Success')
    {
        toast($message, 'success', $title);
    }

    function toastError($message, $title = 'Error')
    {
        toast($message, 'error', $title);
    }

    function toastWarning($message, $title = 'Warning')
    {
        toast($message, 'warning', $title);
    }

    function toastInfo($message, $title = 'Info')
    {
        toast($message, 'info', $title);
    }
}
