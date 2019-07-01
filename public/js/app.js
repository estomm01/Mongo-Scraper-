//console.log("test");
$.ajax({
  method: "GET",
  url: "/getArticle",
}).done(function(data) {

data.forEach(element => {
 let articleRow = `
 <div class="panel panel-default">
 <div class="panel-heading">
     <h4>${element.title}</h4>
 </div>
 <div class="panel-body">
     <p> ${element.summary}</p>
     <a href=${element.link} target="_blank">${element.link}</a>
     <br><br>
     <button type="button" class="btn btn-success save" data-id=${element.id}>Save Article</button>
 </div>
</div>
 `;
$("#articleRow").append(articleRow);

});


})


//Handle Scrape button
$("#scrape").on("click", function() {
  //console.log("test");
  $.ajax({
      method: "GET",
      url: "/getArticle",
  }).done(function(data) {
      console.log(data)
      window.location = "/"
  })
});

//Set clicked nav option to active
$(".navbar-nav li").click(function() {
 $(".navbar-nav li").removeClass("active");
 $(this).addClass("active");
});

//Handle Save Article button
$(document).on("click", ".save", function() {
  console.log("test");
  var thisId = $(this).attr("data-id");
  $.ajax({
      method: "POST",
      url: "/articles/save/" + thisId
  }).done(function(data) {
      window.location = "/"

  })
});

//Handle Delete Article button
$(".delete").on("click", function() {
  var thisId = $(this).attr("data-id");
  $.ajax({
      method: "POST",
      url: "/articles/delete/" + thisId
  }).done(function(data) {
      window.location = "/saved"
  })
});

//Handle Save Note button
// $(".saveNote").on("click", function() {
//   var thisId = $(this).attr("data-id");
//   if (!$("#noteText" + thisId).val()) {
//       alert("please enter a note to save")
//   }else {
//     $.ajax({
//           method: "POST",
//           url: "/notes/save/" + thisId,
//           data: {
//             text: $("#noteText" + thisId).val()
//           }
//         }).done(function(data) {
//             // Log the response
//             console.log(data);
//             // Empty the notes section
//             $("#noteText" + thisId).val("");
//             $(".modalNote").modal("hide");
//             window.location = "/saved"
//         });
//   }
// });

// //Handle Delete Note button
// $(".deleteNote").on("click", function() {
//   var noteId = $(this).attr("data-note-id");
//   var articleId = $(this).attr("data-article-id");
//   $.ajax({
//       method: "DELETE",
//       url: "/notes/delete/" + noteId + "/" + articleId
//   }).done(function(data) {
//       console.log(data)
//       $(".modalNote").modal("hide");
//       window.location = "/saved"
//   })
// });
