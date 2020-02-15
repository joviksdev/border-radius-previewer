// Grab DOM element
const range_controller = document.querySelector('.range-controller');
const range_value = document.querySelector('.range-value');
const item = document.querySelector('.item');
const user_input = document.querySelector('.border-radius-value');
const preview = document.querySelector('.btn-preview');
const error = document.querySelector('.error');
const checkbox = document.querySelector('.custom-btn');
const text = document.querySelector('.copy-text');

// Initial Setting
range_value.textContent = range_controller.value + 'px';
item.style.borderRadius = `${range_controller.value}px`;

/* Change border radius with slider */
range_controller.addEventListener('change', e => {
  range_value.textContent = `${e.target.value}px`;
  item.style.borderRadius = `${e.target.value}px`;
});

// Display custom form on toggle

checkbox.addEventListener('click', e => {
  const display = document.querySelector('.hide');
  if (e.target.checked) {
    display.classList.add('display');
  } else {
    display.classList.remove('display');
  }
});

// Custom Preview
preview.addEventListener('click', e => {
  // Validate user Input
  let radius = '';

  const regReg = /^[0-9\s]+$/g;
  const input = user_input.value;

  const slash = input.search('/');
  if (slash !== -1 || !input.split('/').length > 2) {
    const array = input.split('/');
    array[0].split(' ').length > 4 && errMsg(error);
    array[0].split(' ').forEach(value => {
      if (!value.match(regReg)) {
        errMsg(error);
        return false;
      }

      radius += `${value}px `;
    });

    radius += '/';

    array[1].split(' ').length > 4 && errMsg(error);
    array[1].split(' ').forEach(value => {
      if (!value.match(regReg)) {
        errMsg(error);
        return false;
      }

      radius += `${value}px `;
    });

    item.style.borderRadius = radius;
  } else {
    if (!input.match(regReg)) {
      errMsg(error);
      return false;
    }

    const array_value = input.split(' ');

    array_value.length > 4 && errMsg(error);

    array_value.forEach(value => {
      if (value.length > 3) {
        errMsg(error);

        return false;
      }
      radius += `${value}px `;
    });

    item.style.borderRadius = radius;
  }
});

// Html Error Output
const errMsg = error => {
  error.innerHTML = '*Please enter a valid border radius';

  setTimeout(() => (error.textContent = ''), 3000);
};

// Copy to clipboard and Shake on Click
document.querySelector('.copy').addEventListener('click', function() {
  const clipboard = document.querySelector('.clipboard');

  /* let radius = '';
  user_input.value.split(' ').forEach(value => {
    radius += `${value}px `;
  }); */

  if (user_input.value !== '') {
    text.textContent = user_input.value;
    text.classList.add('show', 'shake');
    user_input.select();
    user_input.setSelectionRange(0, 99999);

    document.execCommand('copy');
  }

  setTimeout(() => {
    text.classList.remove('show', 'shake');
  }, 2000);
});
