const tg = window.Telegram.WebApp;
tg.expand();

document.getElementById('date').min = new Date().toISOString().split('T')[0];
document.getElementById('date').value = document.getElementById('date').min;
document.getElementById('time').min = "12:00";

const parkCb = document.getElementById('needsParking');
const carBox = document.getElementById('carDetails');
const cBrand = document.getElementById('carBrand');
const cPlate = document.getElementById('carPlate');

parkCb.addEventListener('change', () => {
  carBox.style.display = parkCb.checked ? 'block' : 'none';
  cBrand.required = cPlate.required = parkCb.checked;
  if (!parkCb.checked) { cBrand.value = ''; cPlate.value = ''; }
});

cPlate.addEventListener('input', function() {
  this.value = this.value.replace(/[^а-яА-ЯёЁ0-9]/g, '').toUpperCase();
});

document.getElementById('bookingForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const data = {
    name: document.getElementById('name').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    date: document.getElementById('date').value,
    time: document.getElementById('time').value,
    guests: document.getElementById('guests').value,
    needs_parking: parkCb.checked,
    car_brand: parkCb.checked ? cBrand.value.trim() : null,
    car_plate: parkCb.checked ? cPlate.value.trim().toUpperCase() : null
  };
  
  if (data.needs_parking && (!data.car_brand || !data.car_plate)) {
    tg.showAlert('Укажите марку и госномер авто'); return;
  }
  
  tg.sendData(JSON.stringify(data));
  tg.showConfirm('Заявка отправлена! Закройте окно.', () => tg.close());
});