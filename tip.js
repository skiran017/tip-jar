const web3 = new Web3(Web3.givenProvider);

const form = document.querySelector('form');

const send = async (amount) => {
  //connect to wallet
  const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts',
  });
  const wei = web3.utils.toWei(amount, 'ether');
  if (accounts.length > 0) {
    const transaction = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: accounts[0],
          to: '0x02d6190C22293e010846B439787d304668783885',
          value: web3.utils.toHex(wei),
        },
      ],
    });
  }
  console.log(accounts);
};

//check if wallet exists
if (window.ethereum) {
  form.classList.add('has-eth');
}

function submitHandler(e) {
  e.preventDefault();

  if (window.ethereum) {
    const input = form.querySelector('input');
    send(input.value);
  } else {
    alert('Wallet not found. Please install a wallet like Metamask!');
  }
}

form.addEventListener('submit', submitHandler);
