// set up
const toDay = new Date().getFullYear()+'-'+(new Date().getMonth() + 1).toString().padStart(2,'0')+'-'+new Date().getDate().toString().padStart(2,'0');
const currentTime = toDay+ ' ' + new Date().getHours() + ':'+new Date().getMinutes() + ':'+new Date().getSeconds();

var report_day = toDay;
var stored_data = localStorage['manara_Data'] || "{}";
var students = {};
if(!stored_data || stored_data == '{}'){
    $('#page').html('<div style="margin-top: 100px;margin-bottom: 30px; font-size: 30px; color: #aaa">ما من طلبة</div><a href="add_page.html"><button class="btn2 add_page">إضافة طالب جديد</button></a><a href="get_all_students.html"><button class="btn2 add_page gray_background online_btn">عرض كل الطلبة</button></a>');
}else{
    students = JSON.parse(stored_data);

    //===== sort data===========
    show_student_list();
}

// swer list
var swer_list = '';
for (let x = 114; x >= 0; x--) {
    const element = swer[x];
    swer_list += '<option value="'+x+'">'+element+'</option>';
}
$('.swer_list').html(swer_list);
//================


//==========================

function show_student_list(search_text){
    if(document.getElementById('order')){
        //
    }
    if(document.getElementById('page')){
        document.getElementById('page').innerHTML = '';
        for (let x = 0; x < Object.keys(students).length; x++) {
            if(!search_text || Object.keys(students)[x].search(search_text) >= 0){
                const element = Object.keys(students)[x];
                document.getElementById('page').innerHTML += '<a href="student_details_page.html?name='+element.replaceAll(' ','_')+'"><div class="student_bar"><span style="width:30px; display: inline-block">'+(x+1)+'</span>'+element+'</div></a>';
            }
        }
        document.getElementById('page').innerHTML += '<div style="height: 50px"></div><a href="add_page.html"><button class="btn2 add_page">إضافة طالب جديد</button></a>';
        document.getElementById('page').innerHTML += '<a href="get_all_students.html"><button class="btn2 add_page gray_background online_btn">عرض كل الطلبة</button></a>';
    }else if(document.getElementById('check_page')){
        document.getElementById('check_page').innerHTML = '';
        for (let x = 0; x < Object.keys(students).length; x++) {
            if(!search_text || Object.keys(students)[x].search(search_text) >= 0){
                const element = Object.keys(students)[x];
                var sign = '<img src="img/'+get_check_value(x)+'.svg" class="check_icons" id="'+x+'">';
                document.getElementById('check_page').innerHTML += '<tr><td style="width:30px">'+(x+1)+'</td><td>'+sign+'</td><td class="student_bar">'+element+'</td></tr>';
            }
        }
        $('.check_icons').click(function(){
            var v = get_check_value(this.id);
            var next_value = {
                A: 'B', B: 'C', C: 'A',undefined: 'A'
            }
            students[Object.keys(students)[this.id]].checks = students[Object.keys(students)[this.id]].checks.replace(v+':'+report_day+';',next_value[v]+':'+report_day+';');
            this.src = 'img/'+(next_value[v])+'.svg';
            if(v == undefined){
                students[Object.keys(students)[this.id]].checks += 'B:'+report_day+';';
                this.src = 'img/B.svg';
            }
            localStorage['manara_Data'] = JSON.stringify(students);
            database.ref(my_manara+'/students/'+Object.keys(students)[this.id]+'/checks').set(students[Object.keys(students)[this.id]].checks)
        })
    }
}


function update_online(){
    Object.keys(students).forEach(n => {

        function update_cload(prop,value) {
            database.ref(my_manara+'/students/'+n+'/'+prop).set(value);
        }
        update_local();
        function update_local() {
            database.ref(my_manara+'/students/'+n).get().then((snap) => {
                var fetch = snap.val();
                // update swer1
                if(new Date(fetch.date1) > new Date(students[n].date1)){
                    students[n].swer1 = fetch.swer1;
                    students[n].date1 = fetch.date1;
                }else{
                    update_cload('swer1',students[n].swer1);
                    update_cload('date1',students[n].date1);
                }
                //update swer2
                if(new Date(fetch.date2) > new Date(students[n].date2)){
                    students[n].swer2 = fetch.swer2;
                    students[n].date2 = fetch.date2;
                }else{
                    update_cload('swer2',students[n].swer2);
                    update_cload('date2',students[n].date2);
                }
                localStorage['manara_Data'] = JSON.stringify(students);
            })
        }
    })
};
update_online()


function get_check_value(i) {
    var checks = students[Object.keys(students)[i]].checks;
    if(String(checks).search(':'+report_day+';')){
        var value = checks[String(checks).search(':'+report_day+';') - 1];
    };
    return value;
}

function sort_by_swer() {
    let sortedData = {};

    // Sort the keys based on the "swer1" property
    let keys = Object.keys(students).sort((a, b) => {
    if (Number(students[a].swer1) < Number(students[b].swer1)) return -1;
    if (Number(students[a].swer1) > Number(students[b].swer1)) return 1;
    return 0;
    });

    // Populate the new object with the sorted keys
    for (let key of keys) {
    sortedData[key] = students[key];
    }
    students = sortedData;
    show_student_list()
}

// by poe 
function getTimeElapsedArGrammatical(date) {
    const currentDate = new Date();
    const timeDiff = currentDate.getTime() - date.getTime();
  
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
  
    if (years > 0) {
      if (years === 1) {
        return `قبل سنة`;
      } else if (years === 2) {
        return `قبل سنتان`;
      } else if (years >= 3 && years <= 9) {
        return `قبل ${years} سنوات`;
      } else {
        return `قبل ${years} سنة`;
      }
    } else if (months > 0) {
      if (months === 1) {
        return `قبل شهر`;
      } else if (months === 2) {
        return `قبل شهران`;
      } else if (months >= 3 && months <= 9) {
        return `قبل ${months} أشهر`;
      } else {
        return `قبل ${months} شهر`;
      }
    } else if (days > 0) {
      if (days === 1) {
        return `قبل يوم`;
      } else if (days === 2) {
        return `قبل يومان`;
      } else if (days >= 3 && days <= 9) {
        return `قبل ${days} أيام`;
      } else {
        return `قبل ${days} يوم`;
      }
    } else if (hours > 0) {
      if (hours === 1) {
        return `قبل ساعة`;
      } else if (hours === 2) {
        return `قبل ساعتان`;
      } else if (hours >= 3 && hours <= 9) {
        return `قبل ${hours} ساعات`;
      } else {
        return `قبل ${hours} ساعة`;
      }
    } else if (minutes > 0) {
      if (minutes === 1) {
        return `قبل دقيقة`;
      } else if (minutes === 2) {
        return `قبل دقيقتان`;
      } else if (minutes >= 3 && minutes <= 9) {
        return `قبل ${minutes} دقائق`;
      } else {
        return `قبل ${minutes} دقيقة`;
      }
    } else {
      if (seconds === 1) {
        return `قبل ثانية`;
      } else if (seconds === 2) {
        return `قبل ثانيتان`;
      } else if (seconds >= 3 && seconds <= 9) {
        return `قبل ${seconds} ثوان`;
      } else {
        return `قبل ${seconds} ثانية`;
      }
    }
  }