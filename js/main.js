$('#myModal').modal('show');
$(document).ready(function() {


    //main();
    //containerWidth();
    containerMove();
    tooltipShow();
    santaAnimate();
    /*grandMa();*/
    //tree();
    giftFirst();
    ballon();
    fade();
    bounce();
    /*counterGift();*/
    win();
    ski();
    horns();


    $("[type='tel']").mask("+38099 999 9999", {
        autoclear: false
    });
    grayScale();








});
/*$(document).resize(function() {
    containerWidth();
});*/

/*function main() {
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 'auto',
        freeMode: true,
        scrollbar: {
            el: '.swiper-scrollbar',
        },
        mousewheel: true,
    });
}*/


//function containerWidth() {

    //var w = $('.new-year__item').width();
    //var containerWidth = (w * 4) + 1100;
    /*$('.new-year__list').css('width', containerWidth);*/

//}

function containerMove() {
    var container = $('.swiper-slide').width();
    $('.swiper-slide').css({
        '-webkit-transform': 'translate(-' + container + 'px, 0)',
        '-ms-transform': 'translate(-' + container + 'px, 0)',
        'transform': 'translate(-' + container + 'px, 0)'
    }).addClass('move');

    $('#myModal').on('hidden.bs.modal', function(e) {
        $('.swiper-slide').css({
            '-webkit-transform': 'translate(0, 0)',
            '-ms-transform': 'translate(0, 0)',
            'transform': 'translate(0, 0)'
        }).removeClass('move');
    })
    $('#myModal').on('shown.bs.modal', function(e) {
        $('.swiper-slide').addClass('move');
    });
}

function tooltipShow() {
    for (var i = 1; i <= $('[id^="tooltip-element"]').length + 2; i++) {
        elementGift = $('[id="tooltip-element-' + i + '"]');

        elementGift.mouseover(function(e) {

            var index = e.currentTarget.id.substr(16, 10);

            $('#tooltip-' + index).addClass('show');
            setTimeout(function() {
                $('#tooltip-' + index).removeClass('show');
            }, 2000);
        });
    }
}

function santaAnimate() {
    var santa = SVG.select('.santa');
    santa.animate(1000, '>').dmove(0, -20).loop();
}



/*function grandMa() {
    var grandma = SVG.select('.grand-ma');
    grandma.animate().rotate(25).loop();
}*/

function ballon() {
    var ballon = SVG.select('.ballon');

    ballon.click(function(e) {

        this.animate(5000).move(0, -2000);
    });
    // balloon.animate().transform({ rotation: 180 }).loop();

}

function ski() {
    var tooltipElement = SVG.select('#tooltip-element-15');
    tooltipElement.mouseover(function() {
        this.animate().move(-105, 38);
    });

}

function horns() {
    var hornsElement = SVG.select('#tooltip-element-5');
    var horns = SVG.select('.horns');
    hornsElement.mouseover(function() {
        $('.horns').addClass('active');
        setTimeout(function() {
            $('.horns').removeClass('active');
        }, 2000);
    });
}




function tree() {
    var tree = SVG.select('.face');
    tree.animate().transform({ scale: 1.2 }).rotate(-15).after(function(situation) {
        this.animate().rotate(15).reverse().loop();
    })
}

var srcMain = "";

function giftFirst() {
    for (var i = 1; i <= $('[id^="gift-"]').length; i++) {
        elementGift = $('[id="gift-' + i + '"]');
        elementGift.click(function(e) {
            var index = e.currentTarget.id.substr(5, 10);
            $('#gift-modal-' + index).modal('show');
            $(this).css('display', 'none');

            $('[data-id="gift-' + index + '"]').removeClass('disabled');





            
            var count = $('.counter').find('img:not(".disabled")').length;
            count /= 2;
            console.log('кол-во');
            console.log(count);
            $('[data-id="gift-' + index + '"]').attr('src', srcMain);

            $('.counter-heading').find('span').text(count);
            if (count == 20) {
                $('.modal').on('hidden.bs.modal', function(e) {
                    $('#final').modal('show');
                });
            }
        });
    }
}


function bounce() {
    $('#tooltip-element-4').mouseover(function() {
        $('.bounce').addClass('active');
    })
}

/*
function counterGift() {
    var arrayGift = SVG.select('.counter .disabled polygon');
    var arrayGift1 = SVG.select('.counter .disabled path');
    var arrayGift2 = SVG.select('.disabled .gift-line');
    arrayGift.attr('fill', '#aeaeae');
    arrayGift1.attr('fill', '#dfdfdf');
    arrayGift2.attr('fill', '#dfdfdf');
}*/


function fade() {

    $('.stars').css('opacity', '0');
    $('.magic').mouseover(function(e) {
        $('.stars').css('opacity', '1');
        setTimeout(function() {

            $('.stars').css('opacity', '0');
        }, 2000);
    });


    $('.rabit').css('opacity', '0');
    $('.hat').mouseover(function(e) {
        $('.rabit').css('opacity', '1');
        setTimeout(function() {
            $('.rabit').css('opacity', '0');

        }, 2000);
    });

}

function win() {
    var audio = $(".winner")[0];
    $('[id^="gift"]').on('shown.bs.modal', function(e) {
        audio.play();
    });
}

function mobile() {
    if ($(window).width() <= '995') {
        $('#mobile').modal('show');;
    } else {
        $('#mobile').modal('hide');

    }
}

$(window).on('load resize', mobile);







function grayScale() {

    // IE 10 only CSS properties
    var ie10Styles = [
        'msTouchAction',
        'msWrapFlow'
    ];

    var ie11Styles = [
        'msTextCombineHorizontal'
    ];

    /*
     * Test all IE only CSS properties
     */

    var d = document;
    var b = d.body;
    var s = b.style;
    var brwoser = null;
    var property;

    // Tests IE10 properties
    for (var i = 0; i < ie10Styles.length; i++) {
        property = ie10Styles[i];
        if (s[property] != undefined) {
            brwoser = "ie10";
        }
    }

    // Tests IE11 properties
    for (var i = 0; i < ie11Styles.length; i++) {
        property = ie11Styles[i];
        if (s[property] != undefined) {
            brwoser = "ie11";
        }
    }
    console.log(brwoser);
    //Grayscale images only on browsers IE10+ since they removed support for CSS grayscale filter
     srcMain = $('.counter img')[0].src;
    if (brwoser == "ie10" || brwoser == "ie11") {
        $('body').addClass('ie11'); // Fixes marbin issue on IE10 and IE11 after canvas function on images
       
        console.log('путь к картинке');
        console.log(srcMain);
        $('.ie11 .counter img').each(function() {
            console.log(this);
            var el = $(this);
            /*if($(this).hasClass('disabled')) {
                console.log(this);
                
            }*/
            el.css({ "position": "absolute" }).wrap("<div class='img_wrapper' style='display: inline-block'>").clone().addClass('img_grayscale ieImage').css({ "position": "absolute", "z-index": "5", "opacity": "0" }).insertBefore(el).queue(function() {
                var el = $(this);

                el.dequeue();
            });

            this.src = grayscaleIe(this);
        });



        // Custom grayscale function for IE10 and IE11
        function grayscaleIe(element) {
            
            var src = element.src;
            $(element).addClass('disabled');
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            var imgObj = new Image();
            imgObj.src = src;
            canvas.width = imgObj.width;
            canvas.height = imgObj.height;
            ctx.drawImage(imgObj, 0, 0);
            var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
            for (var y = 0; y < imgPixels.height; y++) {
                for (var x = 0; x < imgPixels.width; x++) {
                    var i = (y * 4) * imgPixels.width + x * 4;
                    var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
                    imgPixels.data[i] = avg;
                    imgPixels.data[i + 1] = avg;
                    imgPixels.data[i + 2] = avg;
                }
            }
            ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
            return canvas.toDataURL();
        };
    };

}