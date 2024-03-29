// Function to run "GET" request and collect data from the API
function gety(surl) {
    let req = new XMLHttpRequest();
    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            if (req.responseText.includes('"message"')) {
                return;
            };
            let urlw = JSON.parse(req.responseText);

            // Set the feed image
            document.getElementById("imagex").src = urlw.feed.image;
            document.getElementById("imagea").href = urlw.feed.link;
            document.getElementById("titlex").style.display = "block";
            document.getElementById("titlex").innerHTML = urlw.feed.title;

            // Create a paragraph tag
            var tag = document.createElement("p");
            var text = "List:";
            var e = document.createTextNode(text);
            var element = document.getElementById("songlist");
            document.getElementById("songlist").style.display = "block";

            // Clear out existing song name elements
            const n = document.getElementsByClassName('songname');
            while (n.length > 0) {
                n[0].parentNode.removeChild(n[0]);
            }

            // Loop through response items and create necessary elements and add classes for styling
            for (var a in urlw.items) {
                text = (parseInt(a) + 1).toString() + ". " + urlw.items[a].title;
                e = document.createTextNode(text);
                tag = document.createElement("p");
                tag.appendChild(e);
                element.appendChild(tag);
                tag.classList.add("songname");
                ima = document.createElement("div");
                tag.appendChild(ima);
                imag = document.createElement("img");
                imag.src = urlw.items[a].thumbnail;
                ima.appendChild(imag);
                imag.classList.add("hide");
                imat = document.createElement("div");
                imag.appendChild(imat);
                imas = document.createElement("h2");
                imas.innerHTML = (parseInt(a) + 1).toString();
                imat.appendChild(imas);
                imas.classList.add("textimg");
            }
        }
    };

    // Send the "GET" request
    req.open("GET", "https://api.rss2json.com/v1/api.json?api_key=z2xhwjlzpalizr2j2rhwa65gwsb0dmrhsjopnvy3&count=60&rss_url=" + surl, true);
    req.send();
}

function o() {
    let req = new XMLHttpRequest(),
        url = "https://api.jsonbin.io/v3/b/6325ef66a1610e63862ea53c";

    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            let urln = JSON.parse(req.responseText);
            // No need for the console log statement
            gety(urln.record.key);
        }
    };

    req.open("GET", url, true);
    req.setRequestHeader("X-Master-Key", "$2b$10$kcK7Tf2gYvXTL.yMymJgceFBceLmLoxQUJrWqTYDznBcovDArjnRm");
    req.send();
}

const buttonx = document.getElementById("buttonx");
buttonx.addEventListener("click", post);

// Use set timeout to move delay out of the main function
setTimeout(o, 2000);

function post() {
    let surlp = document.getElementById("link").value;
    let pattern = /https?:\/\/(www\.)?listenbox.app\/[fvi]\/*/;

    if (surlp.match(pattern)) {
        if (surlp.match(/\/[vi]\//)) {
            surlp = surlp.replace(/\/[vi]\//, "/f/");
        }

        let req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if (req.readyState == XMLHttpRequest.DONE) {
                // Check for error
                if (req.responseText.includes('"message"')) {
                    alert("Error!!!");
                    return;
                }

                // Set up loading image
                document.getElementById("imagex").src = "https://img.idesign.vn/2018/10/23/id-loading-1.gif";

                // Get value from url
                gety(surlp);

                // Reset attributes
                surlp = "";
                buttonx.innerHTML = "Done!";
                buttonx.removeEventListener("click", post);

                // Alert user and reset the button
                alert("It's ready to use!");
                setTimeout(function () {
                    buttonx.innerHTML = "Send";
                    buttonx.addEventListener("click", post);
                }, delayInMilliseconds);
            }
        };

        // Set request header values
        req.open("PUT", "https://api.jsonbin.io/v3/b/6325ef66a1610e63862ea53c", true);
        req.setRequestHeader("Content-Type", "application/json");
        req.setRequestHeader("X-Master-Key", "$2b$10$kcK7Tf2gYvXTL.yMymJgceFBceLmLoxQUJrWqTYDznBcovDArjnRm");

        // Send request with value
        req.send('{"key":"' + surlp + '"}');
    } else {
        alert("Wrong link? \n(Right one: https://listenbox.app/f/<ID>)");
    }
}