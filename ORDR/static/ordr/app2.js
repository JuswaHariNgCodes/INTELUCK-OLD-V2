
export function computeTransactionTotal(){
       
    const quantity =  document.querySelector('.content-row-selected[name="Quantity"]'); 
    const priceBefDi = $('.content-row-selected').find('[name="PriceBefDi"]').val();
    const price = $('.content-row-selected').find('[name="Price"]').val();
    const priceAfVat = $('.content-row-selected').find('[name="PriceAfVat"]').val();
    const discPrcnt = $('.content-row-selected').find('[name="DiscPrcnt"]').val();
    const taxCode = $('.content-row-selected').find('[name="TaxCode"]').val();

    return 'haha';
    
}