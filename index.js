/**
 * Sử dụng kiến thức đã học, tạo ra một ứng dụng danh bạ điện thoại, có các chức năng:
 * - Nhập dữ liệu contact (name, phone number)
 * - Sửa dữ liệu contact
 * - Xoá contact
 * - Tìm kiếm contact: có thể nhập vào tên (không dấu hoặc có dấu, chữ hoa hoặc chữ thường vẫn cho ra kết quả) hoặc 1 phần số điện thoại
 */
var readlineSync = require('readline-sync');
var fs = require('fs');
// function
var data =[];
ShowContact()
function ShowContact(){
    var dataRead = fs.readFileSync('./data.json',{encoding:'utf-8'});
    data = JSON.parse(dataRead)
    for( var contact of data){
        console.log(contact.name, contact.phone);
    }
}
function typeContact(arr){
    var id = parseInt( readlineSync.question('what is your id ? : '));
    var name = readlineSync.question('what is your name ? :');
    var phone = readlineSync.question('What is your number phone ? :');
    var checkId = arr.find(function(contact){
        return contact.id === id;
    });
    if(checkId){
        console.log('id exist')
        return ;
    }
    
    var Contact ={
        id:id,
        name:name,
        phone:phone
    }
    data.push(Contact);
    var save = readlineSync.question('are you want to save? nhan 1 de save')
    if(save ==='1'){
        fs.writeFileSync('./data.json',JSON.stringify(data));
    }
    else{
        return;
    }
    
}
// edit element in array by id
function editContact(arr){
    var idMatch = readlineSync.question('what id you are want to edit ?:');
    var id = parseInt(idMatch);
    console.log(typeof(id));
    var result = arr.find(function(contact){
        return contact.id === id;
    });
    console.log(result)
    result.name = readlineSync.question('what is your name to edit:');
    result.phone = readlineSync.question('what your phone to edit:');
    arr.splice(result.id -1 ,1,result);
    fs.writeFileSync('./data.json',JSON.stringify(arr));
    return 
};

// delete element in array from id
function deleteContact(arr){
    var idMatch = readlineSync.question('what id you are want to delete ?:');
    var id = parseInt(idMatch);
    var result = arr.find(function(contact){
        return contact.id === id;
    });
     arr.splice(result.id-1 ,1);
    fs.writeFileSync('./data.json',JSON.stringify(data));
    return result;
}
// find element by id
function findContact(arr){
    console.log('++ 1.Find with name');
    console.log('++ 2.Find with phone number');

    var findOption = readlineSync.question('find with:');
    switch(findOption){
        case '1':
            var name = readlineSync.question('what name you are want to find ?:');
            var result = arr.filter((result)=>{
                         return result.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
                     });
            break;
        case '2':
            var phone = readlineSync.question('what number phone you are want to find ?:');
            var result = arr.filter((result)=>{
                    return result.phone.indexOf(phone) !== -1
                    });
            break;
        default:
            console.log('the option nor exist !!!!');
            break;
    }
         return result;
        
}

//----------------------
function show(){
    console.log('1.Nhap du lieu contact.');
    console.log('2.Sua du lieu contact.');
    console.log('3.Xoa contact.');
    console.log('4.Tim kiem contact.');
    var option = readlineSync.question('What option are you choose ?')
    switch(option){
        case '1':
            console.log('1');
            ShowContact();
            typeContact(data);
            show()
            break;
        case '2':console.log('2');
                editContact(data);
                show()
                break;
        case '3':
            console.log('3');
            deleteContact(data);
            show()
            break;
        case '4':
            console.log('4');
            console.log(findContact(data));
            show()
            break;
        default:
            console.log('option not exist');
            break;
    }
}
show()



