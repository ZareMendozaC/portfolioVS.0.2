(function($) {


    // Browser detection and warning (3rd party)
    var $buoop = { c: 2 };

  



    // jQuery to collapse the navbar on scroll
    $(window).scroll(function() {
        if ($(".navbar").offset().top > 50) {
            $(".navbar-fixed-top").addClass("top-nav-collapse");
            $(".scroll-top").fadeIn('1000', "easeInOutExpo");
        } else {
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
            $(".scroll-top").fadeOut('1000', "easeInOutExpo");
        }
    });

    $(function() {

        $("form.ajax-form").validate({
            errorPlacement: function(error, element) {
                // Append error within linked label
                $(element)
                    .closest("form")
                    .find("label[for='" + element.attr("id") + "']")
                    .append(error);
            },
            errorElement: "span",
            rules: {
                sender: {
                    required: true,
                    minlength: 2,
                    lettersonly: true
                },
                phone: {
                    required: true,
                    digits: true,
                    minlength: 10,
                    maxlength: 15
                },
                email: {
                    required: true,
                    minlength: 6,
                    email: true
                },
                message: {
                    required: true,
                    minlength: 6
                }
            },
            messages: {
                sender: {
                    required: "Please enter your name",
                    minlength: "Minimum 2 characters",
                    lettersonly: "Only letters please!"
                },
                phone: {
                    required: "Please enter your phone number",
                    digits: "Only digits (no spaces)",
                    minlength: "Minimum 10 characters",
                    maxlength: "Maximum 15 characters"
                },
                email: {
                    required: "Please enter your email address",
                    minlength: "Minimum 6 characters",
                    email: "That's an invalid email"
                },
                message: {
                    required: "Please enter your message",
                    minlength: "Minimum 6 characters"
                }
            },
            success: function(label) {
                label.addClass("valid").text("Perfect!");
            },
            submitHandler: function(element) {

                var ajaxform = $(element),
                    url = ajaxform.attr('action'),
                    type = ajaxform.attr('method'),
                    data = {};

                // $(ajaxform).find(".btn").click(function () {

                // });

                $(ajaxform).find('[name="submit"]').html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i> Sending...');

                ajaxform.find('[name]').each(function(index, value) {
                    //console.log(value);
                    var field = $(this),
                        name = field.attr('name'),
                        value = field.val();

                    data[name] = value;

                });

                $.ajax({
                    url: url,
                    type: type,
                    data: data,
                    success: function(response) {
                        //console.log(response.status);
                        if (response.status == 'success') {
                            $(".form-alerts div.row div").html("").append("<div class='alert alert-success' role='alert'><a href='#' class='close' data-dismiss='alert'>&times;</a><strong>Thank you</strong>, your message has been sent successfully!</div>").hide().fadeIn('2000', "easeInOutExpo");
                            $(ajaxform).each(function() {
                                this.reset();
                                $(this).find('[name="submit"]').html('<i class="fa fa-paper-plane fa-fw"></i> Send');
                            }).find('.has-value, .valid').each(function() {
                                $(this).removeClass('has-value');
                                $(this).remove('span.valid');
                            })
                        } else if (response.status == 'error') {
                            $(".form-alerts div.row div").html("").append("<div class='alert alert-danger' role='alert'><a href='#' class='close' data-dismiss='alert'>&times;</a><strong>Oh snap!</strong> Change a few things up and try submitting again.</div>").hide().fadeIn('2000', "easeInOutExpo");
                            $(ajaxform).find('[name="submit"]').html('<i class="fa fa-paper-plane fa-fw"></i> Send');
                        }
                    },
                    error: function(xhr, status, error) {
                        $(".form-alerts div.row div").html("").append("<div class='alert alert-danger' role='alert'><a href='#' class='close' data-dismiss='alert'>&times;</a>" + status + ': ' + error + "</div>").hide().fadeIn('2000', "easeInOutExpo");
                        $(ajaxform).each(function() {
                            this.reset();
                        }).find('.has-value, .valid').each(function() {
                            $(this).removeClass('has-value');
                            $(this).remove('span.valid');
                        })
                    }
                });

                return false;
            }
        });

        // scrollReveal initialise
        window.sr = new scrollReveal({
            reset: false,
            mobile: true
        });

        // window.sr= new scrollReveal({
        //   easing: 'hustle',
        //   move:     '20px',
        //   reset: true,
        //   mobile: false
        // });

        // Typed initialise
        $("#typed").typed({
            strings: ["Hello,", "Hola,"],
            typeSpeed: 200,
            backSpeed: 100,
            backDelay: 2000,
            loop: true,
            contentType: 'html', // or text
            // defaults to false for infinite loop
            loopCount: false,
            resetCallback: function() { newTyped(); }
        });


        // Optional words fade in fade out
        // var keywords = ["Hello, ", "नमस्ते, ", ",مرحبا "];
        // var colours = ["red", "green", "blue", "orange"];
        // var count = 1;
        // setInterval(function(){    
        //     $("span#typed").fadeOut(400, function(){        
        //         $(this).html(keywords[count]).css("color", colours[count]);
        //         count++;        
        //         if(count == keywords.length)            
        //             count = 0;        
        //         $(this).fadeIn(400);    
        //     });
        // }, 2000);


        // scrollTo Function
        $.fn.scrollTo = function(anchor) {
            $('html, body').stop().animate({
                scrollTop: $(anchor).offset().top
            }, 1000, 'easeInOutExpo');
        };


        // jQuery Address initialise
        $.address.init(function(event) {
            if (event.value.length > 0 && event.value != "/") {
                var b = event.value.split("/").join("#");
                return $.address.path(event.value);

                // if url length is valid and not empty...
                $(this).scrollTo(b);
            } else {
                //... if it is empty or invalid go to home
                $(this).scrollTo("#home");
            }

        }).change(function(event) {
            var b = event.value.split("/").join("#");

            var arr = [];
            i = 0;
            $("ul.navbar-nav li a").each(function() {
                arr[i++] = $(this).attr('href');
            });
            var elem = arr.slice(1, arr.length);

            if (!!~jQuery.inArray(b, elem)) {
                $(this).scrollTo(b);
            } else {
                $.address.path("home");
                $(this).scrollTo("#home");
            }

        });

        // General link address click
        $('ul.nav li a').bind('click', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 1000, 'easeInOutExpo');
            event.preventDefault();
        });

        // Scroll top
        $('.scroll-top li a,a.navbar-brand').bind('click', function(event) {
            // window.location.hash = '';
            return $.address.path(event.value);
            $('html, body').stop().animate({
                scrollTop: $("#home").offset().top
            }, 1000, 'easeInOutExpo');
            event.preventDefault();
        });


        // Bottom nav scrollTo
        $('.bottom-nav ul li a, a.btn-circle, a.page-scroll').bind('click', function(event) {
            var $anchor = $(this);
            // console.log($($anchor.attr('href')).offset().top  - $(window).scrollTop());

            if ($(window).scrollTop() != $($anchor.attr('href')).offset().top) {
                $('html, body').stop().animate({
                    scrollTop: $($anchor.attr('href')).offset().top
                }, 1000, 'easeInOutExpo');
                event.preventDefault();
            }
        });

        // About website div toggle
        $(".about-website").click(function() {
            $('.more-about-website').stop().slideToggle('1000', "easeInOutExpo", function() {
                $('.segment').stop().slideToggle('3000', "easeInOutExpo");
            });
        });

        // About website button active class toggle
        $(".about-section .btn-default").click(function() {
            $(this).toggleClass("active");
        });


        // More projects toggle
        $(".portfolio-more").click(function() {
            if ($('.more-projects').is(':hidden')) {
                $(".more-projects").stop().slideToggle('1000', "easeInOutExpo", function() {
                    $(".portfolio-more").addClass('expanded').html("Close [<i class='fa fa-close'></i>]");
                });
            } else {
                $('.more-projects').stop().slideToggle('1000', "easeInOutExpo", function() {
                    $(".portfolio-more").removeClass('expanded').html("&amp; more...");
                });
            };
        });


        // Portfolio item animation
        $('.portfolio-item-block a').hover(function() {
            $('> figcaption h4, > figcaption h5', this).stop().animate({ bottom: '-=15px' }, '2000', "easeInOutExpo");
            $('> figcaption .view-portfolio-item', this).stop().animate({ bottom: '-=15px' }, '2000', "easeInOutExpo");
            $('> figcaption', this).stop().fadeToggle('1000', "easeInOutExpo");

        }, function() {
            $('> figcaption', this).stop().fadeToggle('1000', "easeInOutExpo");
            $('> figcaption .view-portfolio-item', this).stop().animate({ bottom: '0px' }, '2000', "easeInOutExpo");
            $('> figcaption h4,> figcaption h5', this).stop().animate({ bottom: '0px' }, '2000', "easeInOutExpo");
        });


        // Closes the Responsive menu on menu item click
        $('.navbar-collapse ul li a').click(function() {
            $('.navbar-toggle:visible').click();
        });


        // Owl Carousel
        var owl = $(".owl-carousel");

        $(".owl-carousel").owlCarousel({
            autoPlay: 3000,
            stopOnHover: true,
            navigation: false,
            pagination: false,
            lazyLoad: true,
            paginationSpeed: 1000,
            goToFirstSpeed: 2000,
            singleItem: true,
            autoHeight: true,
            transitionStyle: "fade"
        });

        // Custom navigation events for Owl Carousel
        $(".next").click(function() {
            owl.trigger('owl.next');
        })

        $(".prev").click(function() {
            owl.trigger('owl.prev');
        })


        // Navbar show/hide on offset
        if ($(".navbar").offset().top > 50) {
            $(".navbar-fixed-top").addClass("top-nav-collapse");
            $(".scroll-top").fadeIn('1000', "easeInOutExpo");
        } else {
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
            $(".scroll-top").fadeOut('1000', "easeInOutExpo");
        }


        $(".navbar-toggle").click(function() {
            if ($(".navbar").offset().top <= 0) {
                $(".navbar-fixed-top").toggleClass("top-nav-collapse");
            }
        });

        // Contact form input transitions
        $('input,textarea').val("");
        $('.contact-form .form-group input,.contact-form .form-group textarea').focusout(function() {
            var text_val = $(this).val();
            if (text_val === "") {
                $(this).removeClass('has-value');
            } else {
                $(this).addClass('has-value');
            }
        });



    });

})(jQuery);
