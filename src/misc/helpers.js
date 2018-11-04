export function formatterFactory(userStyle='currency', userCurrency='USD') {
    return new Intl.NumberFormat('en-US', {
        style: userStyle,
        currency: userCurrency
    });
}
