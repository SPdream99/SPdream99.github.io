//Initial
$(document).ready(function () {
    setTimeout(function () {
        $(".preloader").fadeOut(function () {
            $(".prompt").fadeIn();
        });
    }, 2000);

    document.cookie = "music=off";
    $("#go-to-top").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {
                window.location.hash = hash;
            });
        }
    });
    document.getElementsByClassName("music-btn")[0].addEventListener("click", () => {
        musicControlButton();
    });
});
window.onscroll = function () {
    scrollFunction("go-to-top", 300)
};
window.addEventListener("scroll", () => {
    scrolling(".container")
});
window.addEventListener("scroll", () => {
    scrolling(".container", null, false, "#credit", 1)
});
window.addEventListener("scroll", () => {
    scrolling(".container", null, false, "#progress-bar", 2, ["north", "middle", "south"])
});

//Function
function scrolling(select, link, base = true, child, num = 0, ...change) {
    elements = document.querySelectorAll(select);
    for (var i = 0; i < elements.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = elements[i].getBoundingClientRect().top;
        if (link != null) {
            var elementVisible = link;
        } else {
            var elementVisible = elements[i].offsetHeight * 0.7;
        }
        if (base != false) {
            if (elementTop < windowHeight - elementVisible) {
                elements[i].classList.remove("inactive");
                elements[i].classList.add("active");
            } else {
                elements[i].classList.remove("active");
                elements[i].classList.add("inactive");
            }
        } else {
            sub = document.querySelectorAll(child);
            if (change.length == 0) {
                if (i == num) {
                    if (elementTop < windowHeight - elementVisible) {
                        sub[0].classList.add("active");
                    } else {
                        sub[0].classList.remove("active");
                    }
                    break;
                }
            } else {
                if (elementTop < windowHeight - elementVisible) {
                    sub[0].classList.add(change[0][i]);
                    sub[0].classList.remove(change[0][i - 1]);
                } else {
                    sub[0].classList.remove(change[0][i]);
                }
            }
        }
    }
}

function scrollFunction(Id, height) {
    let btn = document.getElementById(Id);
    if (document.body.scrollTop > height || document.documentElement.scrollTop > height) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
}

function musicControl(state = false, btn = 0) {
    if (btn == 0) {
        load_screen = $("#loading-container");
        $(".prompt").fadeOut();
        load_screen.fadeOut();
        load_screen[0].classList.remove("active");
        $(".container.north")[0].classList.add("active");
    }
    button = document.getElementsByClassName("music-btn")[0];
    if (state == true) {
        document.getElementById("music-player").play();
        document.cookie = "music=on";
        button.classList.add("on");
        button.classList.remove("off");
        musicFocus();
    } else {
        document.getElementById("music-player").pause();
        document.cookie = "music=off";
        button.classList.add("off");
        button.classList.remove("on");
    }
}

function musicControlButton() {
    let cookie = document.cookie;
    if (cookie.includes("music=on")) {
        musicControl(false, 1);
    } else {
        musicControl(true, 1);
    }
}

function musicFocus() {
    let cookie = document.cookie;
    $(window).focus(function () {
        if (cookie.includes("music=on")) {
            document.getElementById("music-player").play();
            cookie = document.cookie;
        }
    });

    $(window).blur(function () {
        if (cookie.includes("music=on")) {
            document.getElementById("music-player").pause();
            cookie = document.cookie;
        }
    });
}