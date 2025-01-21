
@extends('layouts.onsite')

@section('content')
    <div id="payment-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden"> 
        <div class="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 class="text-xl font-semibold" id="modal-title"></h2>
            <p id="modal-content" class="mt-2 text-gray-600"></p>

            <div class="mt-5 sm:mt-4 flex justify-end items-center space-x-4">
                <button id="pay-now" type="button" class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:w-auto">Continue</button>
                <button id="close-modal" type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
            </div>

            <p id="payment-status" class="mt-3 text-sm hidden"></p>
        </div>
    </div>
@endsection
