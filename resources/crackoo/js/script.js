
// @koala-prepend "plugin.js"
// @koala-prepend "jquery-1.11.1.min.js"
// @koala-prepend "bootstrap.js"


// jQuery is ready

$('a').click(function () {
    $('html, body').animate({
        scrollTop: $($(this).attr('href')).offset().top - 99
    }, 500);
    return false;
});
$( "#accordion" ).accordion();
$( "#tabs" ).tabs();

$('.bxslider').bxSlider({

    auto: true,
    controls: false,
    paging: true,
    auto: true,
    pause: 2000,
    autoStart: true

});
$("#mainNavigation li a").on('click', function () {
    $("#mainNavigation li a").removeClass("activeLink");
    $(this).addClass("activeLink");
});


$(document).ready(function() {
    $(".toogle-link").click(function() {
        $(this).next('.toogle-content').slideToggle();
        $(this).toggleClass("closed-content");
        $(this).prev('h3').toggleClass("green-title");
    });
    var callbacks_list = $('.demo-callbacks ul');
    $('.demo-list input').on('ifCreated ifClicked ifChanged ifChecked ifUnchecked ifDisabled ifEnabled ifDestroyed', function(event){
        callbacks_list.prepend('<li><span>#' + this.id + '</span> is ' + event.type.replace('if', '').toLowerCase() + '</li>');
    }).iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%'
    });
    $('.fancybox').fancybox();

    $(".cb-enable").click(function(){
        var parent = $(this).parents('.switch');
        $('.cb-disable',parent).removeClass('selected');
        $(this).addClass('selected');
        $('.checkbox',parent).attr('checked', true);
    });
    $(".cb-disable").click(function(){
        var parent = $(this).parents('.switch');
        $('.cb-enable',parent).removeClass('selected');
        $(this).addClass('selected');
        $('.checkbox',parent).attr('checked', false);
    });

    $('section.forStudents').each(function(i) {
        var position = $(this).position();
        console.log(position);
        console.log('min: ' + position.top + ' / max: ' + parseInt(position.top + $(this).height()));
        $(this).scrollspy({
            min: position.top - 99,
            max: position.top + $(this).height() - 80,
            onEnter: function(element, position) {
                if(console) console.log('entering ' +  element.id);
                $("a.forStudents").addClass('activeLink');
            },
            onLeave: function(element, position) {
                if(console) console.log('leaving ' +  element.id);
                $("a.forStudents").removeClass('activeLink');
            }
        });
    });
    $('section.forschools').each(function(i) {
        var position = $(this).position();
        console.log(position);
        console.log('min: ' + position.top + ' / max: ' + parseInt(position.top + $(this).height()));
        $(this).scrollspy({
            min: position.top - 99,
            max: position.top + $(this).height() - 180,
            onEnter: function(element, position) {
                if(console) console.log('entering ' +  element.id);
                $("a.forschools").addClass('activeLink');
            },
            onLeave: function(element, position) {
                if(console) console.log('leaving ' +  element.id);
                $("a.forschools").removeClass('activeLink');
            }
        });
    });

    $('section.forPublishers').each(function(i) {
        var position = $(this).position();
        console.log(position);
        console.log('min: ' + position.top + ' / max: ' + parseInt(position.top + $(this).height()));
        $(this).scrollspy({
            min: position.top - 99,
            max: position.top + $(this).height() - 80,
            onEnter: function(element, position) {
                if(console) console.log('entering ' +  element.id);
                $("a.forPublishers").addClass('activeLink');
            },
            onLeave: function(element, position) {
                if(console) console.log('leaving ' +  element.id);
                $("a.forPublishers").removeClass('activeLink');
            }
        });
    });
    $('div.inaction').each(function(i) {
        var position = $(this).position();
        console.log(position);
        console.log('min: ' + position.top + ' / max: ' + parseInt(position.top + $(this).height()));
        $(this).scrollspy({
            min: position.top - 99,
            max: position.top + $(this).height() - 180,
            onEnter: function(element, position) {
                if(console) console.log('entering ' +  element.id);
                $("a.inaction").addClass('activeLink');
            },
            onLeave: function(element, position) {
                if(console) console.log('leaving ' +  element.id);
                $("a.inaction").removeClass('activeLink');
            }
        });
    });
    $('div.contact').each(function(i) {
        var position = $(this).position();
        console.log(position);
        console.log('min: ' + position.top + ' / max: ' + parseInt(position.top + $(this).height()));
        $(this).scrollspy({
            min: position.top - 99,
            max: position.top + $(this).height() - 80,
            onEnter: function(element, position) {
                if(console) console.log('entering ' +  element.id);
                $("a.contactanchor").addClass('activeLink');
            },
            onLeave: function(element, position) {
                if(console) console.log('leaving ' +  element.id);
                $("a.contactanchor").removeClass('activeLink');
            }
        });
    });
});

jQuery(document).ready(function ($) {
    "use strict";
    $('#Default').perfectScrollbar(
        {

            wheelPropagation: true,
            minScrollbarLength: 30
        }
    );
});
var updateSize = function () {
    var width = parseInt($('#width').val(), 10);
    var height = parseInt($('#height').val(), 10);
    $('#Default').width(width).height(height).perfectScrollbar('update');
};
