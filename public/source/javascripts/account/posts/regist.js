const btnSubmit_onclick = function (e) {
  const $submit = $(this);
  const $form = $submit.parents("form");
  $form.attr("method", $submit.data("method"));
  $form.attr("action", $submit.data("action"));
  $form.submit();
};

const document_onready = function (e) {
  $("input[type='submit']").on("click", btnSubmit_onclick);
};

$(document).ready(document_onready);
