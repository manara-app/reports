var students = {
    abc : {
        name: 'القاسم سالم',
        swer1: 15,
        swer2: 'حزب الاعلى'
    }
};
var selected_student = null;
//get local storage
if(localStorage['manaraStudents']){
    students = JSON.parse(localStorage['manaraStudents']);
}else{
    // load data from internet
}
for (let x = 0; x < swer.length; x++) {
    document.getElementById('swer1').innerHTML += '<option value="'+x+'">'+swer[x]+'</option>';
}
// set up -- get stuudents
function show_students(){
    document.getElementById('student_list').innerHTML = '';
    var keys = Object.keys(students);
    keys.forEach(element => {
        document.getElementById('student_list').innerHTML += '<div class="student_bar" id="'+element+'">'+students[element].name+'</div>';
    });
}

function save_update(){
    localStorage['manaraStudents'] = JSON.stringify(students);
    show_students();
}
show_students();

$('.student_bar').on('click',function () {
    selected_student = this.id;
    $('#student_page').fadeIn();
    $('#night').fadeIn();
    $('#student_name').html(students[this.id].name);
    $('#swer1').val(Number(students[this.id].swer1));
    console.log(swer[Number(students[this.id].swer1)])
});

$('#swer1').on('change',function(){
    $('#update_swer1').fadeIn('fast');
    $('#update_swer1').html('حفظ');
});

$('#update_swer1').on('click',function (){
    this.innerHTML = '<img src="img/check-svgrepo-com.svg" width="30">';
    console.log(selected_student)
    students[selected_student].swer1 = $('#swer1').val();
    save_update();
})
