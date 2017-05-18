var BottomPrize = 500;
var TopPrize = 40000;
var AddPrize = 1000;
var TotalPrize = 0;
var myVerify = false;

$(function(){
  var Item = [];
  var currencies = [];
  currencies = myData;

  //init
  $('#TopPrize').val(TopPrize);
  $('#BottomPrize').val(BottomPrize);
  $('#AddPrize').val(AddPrize);

  /* sample
  var currencies = [
    { value: '牛肉', data: '10' },
    { value: '羊肉', data: '100' },
    { value: '豬肉', data: '1000' },
  ];
  */

  // setup autocomplete function pulling from currencies[] array
  $('#autocomplete').autocomplete({
    lookup: currencies,
    onSelect: function (suggestion) {
        Item = [
            {value: suggestion.value, data: suggestion.data},
        ];
    }
  });
 
  $("#ItemNumber").on( "keydown", function(event) {
      if(event.which == 13) {
          var thisItem = JSON.stringify(Item);
          if ('[]' == thisItem) {
              alert("品項不正確");
              myVerify = false;
          } else {
              myVerify = true;
              var ItemNumber = parseInt($("#ItemNumber").val());
              var plusPrize = Item[0].data * ItemNumber;
              var thehtml = '<div class="flatbtn"><strong>' + Item[0].value + '</strong>  <strong> x </strong> ' +  ItemNumber + '份 = $' + plusPrize +'</div>';
              $(thehtml).appendTo( "#outputcontent" );
              $('#autocomplete').val('');
              $('#ItemNumber').val(0);

              TotalPrize = TotalPrize + plusPrize;

              var thehtml2 = $().runPrize(TotalPrize);
              $("#totalPrizeTitle").html('試算結果 - 原價 $' + TotalPrize);
              $("#outputcontent2").html(thehtml2);
          }
      }
  });

  $("#BottomPrize").on( "keydown", function(event) {
      if(event.which == 13) {
          var thisItem = parseInt($("#BottomPrize").val());
          if (!thisItem) {
              alert("資料不正確，請重新檢查輸入資料.");
              return false;
          } else {
              //alert(TotalPrize);
              var thehtml2 = $().runPrize(TotalPrize);
              $("#outputcontent2").html(thehtml2);
          }
      }
   });

   $("#TopPrize").on( "keydown", function(event) {
      if(event.which == 13) {
          var thisItem = parseInt($("#TopPrize").val());
          if (!thisItem) {
              alert("料不正確，請重新檢查輸入資料.");
              return false;
          } else {
              var thehtml2 = $().runPrize(TotalPrize);
              $("#outputcontent2").html(thehtml2);
          }
      }
   });

   $("#AddPrize").on( "keydown", function(event) {
      if(event.which == 13) {
          var thisItem = parseInt($("#AddPrize").val());
          if (!thisItem) {
              alert("料不正確，請重新檢查輸入資料.");
              return false;
          } else {
              var thehtml2 = $().runPrize(TotalPrize);
              $("#outputcontent2").html(thehtml2);
          }
      }
   });

});

$(function () {
    //declare function 
    $.fn.runPrize = function (totalPrize) {
        var Bottom = parseInt($("#BottomPrize").val());
        var Top = parseInt($("#TopPrize").val());
        var Add = parseInt($("#AddPrize").val());
        if (!Bottom) {
            Bottom = BottomPrize;
        }
        if (!Top) {
            Top = TopPrize;
        }
        if (!Add) {
            Add = AddPrize;
        }

        var thehtml = '';
        for (var i = Bottom; i <= Top; i = i+Add) {
            var x = i / totalPrize;
            x = x.toFixed(2);
            var x_word = parseInt(x * 100) / 10;
            if (x >= 1) {
                thehtml = thehtml + '<li class="redli">出價: ' + i + ' 等於 ' + x_word + ' 折</li>';
            } else {
                thehtml = thehtml + '<li>出價: ' + i + ' 等於打 ' + x_word + ' 折</li>';
            }
        }
        return thehtml;
    };
});

