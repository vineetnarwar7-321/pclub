let user=[];

document.getElementById('stock').addEventListener('submit',function(e) {
    e.preventDefault();
    
    const market=document.getElementById('company').value;
    
    const phone_no=document.getElementById('phone').value;
    const date=document.getElementById('date').value;
    user_details={
        mobile:phone_no,
        dat:date

    };
    user.push(user_details);
    
        
    localStorage.setItem("company",company);
    localStorage.setItem("date",date);
    
    
        window.location.href="stock.html";
    



})