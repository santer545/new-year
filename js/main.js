$(document).ready(function() {
    containerWidth();
    containerMove();
    tooltipShow();
    santaAnimate ();
    grandMa ();
    tree ();
    giftFirst ();

    $('#myModal').modal('show');
});
$(document).resize(function() {
    containerWidth();
});


function containerWidth() {

    var w = $('.new-year__item').width();
    var containerWidth = (w * 4) + 100;
    $('.new-year__list').css('width', containerWidth);

}

function containerMove() {
    var container = $('.new-year__item').width() * 4 - 2020;
    $('.new-year').css({
        '-webkit-transform': 'translate(-' + container + 'px, 0)',
        '-ms-transform': 'translate(-' + container + 'px, 0)',
        'transform': 'translate(-' + container + 'px, 0)'
    }).addClass('move');

    $('#myModal').on('hidden.bs.modal', function(e) {
        $('.new-year').css({
            '-webkit-transform': 'translate(0, 0)',
            '-ms-transform': 'translate(0, 0)',
            'transform': 'translate(0, 0)'
        }).removeClass('move');
    })
}

function tooltipShow() {
    var element1 = SVG.select('#tooltip-1');
    var point1 = SVG.select('.js-girl-1');
    point1.animate().rotate(25).loop();
    point1.click(function() {
        element1.addClass('show');
        setTimeout(function() {
            element1.removeClass('show');
        }, 2000);
    });
}

function santaAnimate () {
    var santa = SVG.select('.santa');
    santa.animate(500, '>').move(0, -20).reverse(true).loop();
}

function grandMa () {
    var grandma = SVG.select('.grand-ma');
    grandma.animate().rotate(25).loop();
}

function tree () {
    var tree = SVG.select('.christmas-tree');
    tree.animate(3000).dmove(100, -20).after(function(situation) {
        this.animate(3000).dmove(-30, 10).loop();
    });
}

function giftFirst () {
    var light = SVG.select('.light');
    light.click(function () {
        $('#promo-1').modal('show');
    });
}