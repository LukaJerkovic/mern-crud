const basePrices = [
  { amount: 1000, city: 'Zagreb' },
  { amount: 950, city: 'Split' },
  { amount: 900, city: 'Rijeka' },
  { amount: 900, city: 'Osijek' },
  { amount: 800, city: 'Zadar' },
  { amount: 700, city: 'other' },
];

const discounts = [
  { discount: 20, age: '0-20' },
  { discount: 10, age: '20-30' },
  { discount: 5, age: '30-40' },
  { discount: 2, age: '40-60' },
  { discount: 0, age: '60-200' },
];

function calculateInsurancePrice(city, dateOfBirth) {
  const basePrice = getBasePrice(city);
  const age = calculateAge(dateOfBirth);
  const discount = getDiscount(age);

  const insurancePrice = basePrice - (basePrice * discount) / 100;
  return insurancePrice;
}

function getBasePrice(city) {
  const normalizedCity = city.toLowerCase();
  const basePriceEntry = basePrices.find(
    (entry) => entry.city.toLowerCase() === normalizedCity
  );
  return basePriceEntry ? basePriceEntry.amount : 0;
}

function getDiscount(age) {
  console.log('Age:', age); 
  const discountEntry = discounts.find((entry) => {
    const [minAge, maxAge] = entry.age.split('-');
    return age >= minAge && age <= maxAge;
  });
  console.log('Discount Entry:', discountEntry); 
  return discountEntry ? discountEntry.discount : 0;
}


function calculateAge(dateOfBirth) {
  const birthDate = new Date(dateOfBirth);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - birthDate.getFullYear();

  // Adjust age based on the month and day of birth
  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() < birthDate.getDate())
  ) {
    return age - 1;
  }

  return age;
}

module.exports = {
  calculateInsurancePrice,
};
