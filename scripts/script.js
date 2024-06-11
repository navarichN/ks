"use strict";

$(document).ready(function() {
    let buttonToUp = $('.button-up');

    function visibility() {
        if ($(window).scrollTop() > 530) {
            buttonToUp.css('opacity', '1');
        } else {
            buttonToUp.css('opacity', '0');
        }
    }

    buttonToUp.on('click', function() {
        $('html, body').animate({ scrollTop: 0 }, 'smooth');
    });

    $(window).on('scroll', visibility);

    $('.smooth-scroll').on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            let hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function(){
                window.location.hash = hash;
            });
        }
    });

    const form = $('#form');
    form.on('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form[0]);
        // formData.append('image', formImage.files[0]);

        if (error === 0) {
            form.addClass('_sending');
            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                let result = await response.json();
                alert(result.message);
                $('#formPreview').html('');
                form[0].reset();
            } else {
                alert("Ошибка");
            }
        } else {
            alert('Заполните обязательные поля');
        }
    }

    function formValidate(form) {
        let error = 0;
        let formReq = $('._req');

        formReq.each(function() {
            let input = $(this);
            formRemoveError(input);

            if (input.hasClass('_email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else {
                if (input.val() === '') {
                    formAddError(input);
                    error++;
                }
            }
        });

        return error;
    }

    function formAddError(input) {
        input.parent().addClass('_error');
        input.addClass('_error');
    }

    function formRemoveError(input) {
        input.parent().removeClass('_error');
        input.removeClass('_error');
    }

    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.val());
    }
});
