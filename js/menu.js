var CONTENT = [
    ['سجل الطلبة','students_page.html'],
    ['رصد الحضور','check_page.html'],
    ['إضافة طالب جديد','add_page.html'],
    ['مشاركة السجلات','reports_share.html'],
    ['عن التطبيق','about.html']
];

CONTENT.forEach(element => {
    if(document.getElementById('mnu')){
        document.getElementById('mnu').innerHTML += '<a class="mnu_item" href="'+element[1]+'">'+element[0]+'</a>';
    }
});

var show_mnu = false;

$('#mnu_icon').click(function(){
    if(show_mnu == false){
        $('#side_mnu').css('right','0%');
        $('#night').fadeIn();
        show_mnu = true;
    }else{
        hide_mnu()
    }
});

function hide_mnu() {
    show_mnu = false;
    $('#side_mnu').css('right','-80%');
    $('#night').fadeOut();
}

$('#night').click(function () {
    hide_mnu()
})