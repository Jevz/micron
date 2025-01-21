@extends('layouts.onsite')

@section('content')
    <button id="onsite-button" type="button" class="rounded-full bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        Support {{ $user }}
    </button>
@endsection