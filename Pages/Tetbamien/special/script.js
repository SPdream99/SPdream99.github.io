$(document).ready(function () {
    if (screen.availHeight > screen.availWidth) {
        $(".envelope")[0].style.height = "18.5%";
        $(".envelope")[0].style.transform = "scale(1.9)";
        $(".paper")[0].style.height = "19.5%";
        $(".paper")[0].style.transform = "scale(1.9)";
        document.documentElement.style.setProperty('--locate','36%');
    } else {
        $(".envelope")[0].style.height = "77%";
        $(".envelope")[0].style.transform = "scale(1)";
        $(".paper")[0].style.height = "77%";
        $(".paper")[0].style.transform = "scale(1)";
        document.documentElement.style.setProperty('--locate','6%');
    }
    const wish = ["Chúc Tết đến trăm điều như ý", "Mừng xuân sang vạn sự thành công", "May mắn ngập tràn cả năm", "Cố gắng gấp đôi niềm tin vững chắc", "Gia đình hạnh phúc ấm vui rộn ràng", "Niềm vui tràn trề tiếng cười", "Nỗ lực sẽ thành công"];
    const random = Math.floor(Math.random() * wish.length);
    document.getElementsByClassName("wish")[0].innerHTML = wish[random];
    window.addEventListener("resize", rotateCaution);
    element = document.querySelectorAll(".envelope");
    element[0].addEventListener("click", () => {
        element[0].classList.add("active");
        createFirework();
    });
});

function rotateCaution() {
    if (screen.availHeight > screen.availWidth) {
        $(".envelope")[0].style.height = "18.5%";
        $(".envelope")[0].style.transform = "scale(1.9)";
        $(".paper")[0].style.height = "19.5%";
        $(".paper")[0].style.transform = "scale(1.9)";
        document.documentElement.style.setProperty('--locate','36%');
    } else {
        $(".envelope")[0].style.height = "77%";
        $(".envelope")[0].style.transform = "scale(1)";
        $(".paper")[0].style.height = "77%";
        $(".paper")[0].style.transform = "scale(1)";
        document.documentElement.style.setProperty('--locate','6%');
    }
}

var fw_spread = 250
var fw_scale = 5
var fw_launch_rate = 1000

function createFirework(e) {
    var f = document.createElement('div')
    f.style.zIndex = '2';
    f.className = 'firework'
    f.style.width = '2px'
    f.style.height = '2px'
    f.style.position = 'absolute'
    f.style.left = Math.random() * 33 + 33 + '%'
    f.style.top = '100%'
    var clr = 'hsl(' + Math.random() * 360 + 'deg,100%,50%)'
    f.style.transition = Math.random() < .5 ? 'ease-out ' + 3 + 's' : 'ease-in ' + 2.5 + 's'

    document.body.appendChild(f)

    for (var i = 0; i < 25; i++) {
        var p = document.createElement('div')
        p.className = 'particle'
        p.style.width = '100%'
        p.style.height = '100%'
        p.style.backgroundColor = clr
        p.style.position = 'absolute'
        p.style.left = '0'
        p.style.top = '0'
        p.style.transition = '.5s'
        p.style.borderRadius = '50%'
        f.appendChild(p)
    }

    setTimeout(function () {
        f.style.top = Math.random() * 50 + 5 + '%'
        f.ontransitionend = function () {
            var p = this.querySelectorAll('.particle')
            p.forEach(function (elm) {
                var x = Math.random() < .7 ? Math.random() * fw_spread : (-1) * Math.random() * fw_spread
                var y = Math.random() < .5 ? Math.random() * fw_spread : (-1) * Math.random() * fw_spread
                elm.style.left = x + 'px'
                elm.style.top = y + 'px'
                elm.style.opacity = '0'
                elm.style.transform = 'scale(' + fw_scale + ')'
                document.body.style.setProperty('--bg-color', clr)
                elm.ontransitionend = function () {
                    this.remove()
                }
            })
            setTimeout(function () {
                f.remove()
            }, 1000)
        }
    }, 100)

    setTimeout(createFirework, fw_launch_rate)
}