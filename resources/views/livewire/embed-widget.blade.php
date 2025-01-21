<div>
    <button wire:click="toggleModal" class="bg-yellow-400 text-black px-4 py-2 rounded-md">
        Support {{ $user }}
    </button>


    <div>{{json_encode($showModal)}}</div>

    @if($showModal ?? false)
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div class="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
                <h2 class="text-xl font-semibold">Support {{ $user }}</h2>
                <p class="mt-2 text-gray-600">Amount: {{ $currency }} {{ $amount }}</p>

                @if(!$paymentStatus)
                    <button wire:click="processPayment" class="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
                        Pay Now
                    </button>
                @endif

                <p class="mt-3 text-sm">{{ $paymentStatus }}</p>
                <button wire:click="$set('showModal', false)" class="mt-2 text-gray-500">Close</button>
            </div>
        </div>
    @endif
</div>
