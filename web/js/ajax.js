$('#send').click(function(){
    $.ajax({
        type: "GET",
        url:" app.json",
        data:{"obj":"booksHomeworkList","booksId":"","teacherCode":""},
        dataType: "json",
        success:function(data){
            console.log(data);
        }
    })
})