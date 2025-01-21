<?php

namespace App\Livewire;

use Livewire\Component;
use Livewire\Attributes\Layout;

#[Layout('layouts.onsite')] 
class EmbedWidget extends Component
{
    public $user;
    public $amount;
    public $currency;
    public $paymentStatus = '';
    public $showModal = false;

    public function mount($user = 'User', $amount = 5, $currency = 'ZAR')
    {
        $this->user = $user;
        $this->amount = $amount;
        $this->currency = $currency;
    }

    public function processPayment()
    {
        // Simulate an AJAX payment request (Replace this with actual API call)
        sleep(1);
        $this->paymentStatus = "Payment successful!";
    }

    public function render()
    {
        return view('livewire.embed-widget');
    }

    public function toggleModal()
    {
        Log::info('Toggling modal');
        $this->showModal = !$this->showModal;
    }
}

