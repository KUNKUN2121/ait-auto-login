window.onload = function () {
    const message = localStorage.getItem("redirectMessage");
    if (message) {
        showPopup(message, false);
        localStorage.removeItem("redirectMessage");
    }
    // ユーザー名とパスワードを読み込む
    chrome.storage.local.get(['id', 'pass', 'autologin'], function (items) {
        const username = items.id;
        const password = items.pass;
        const autologin = items.autologin;

        if (!username || !password) {
            return;
        }

        // ログイン処理を実行
        executeLogin(username, password,autologin);
    });
};

function executeLogin(username, password,autologin) {
    // ポップアップ表示関数

    // moodle
    if (window.location.hostname === "cms.aitech.ac.jp" && autologin.moodle) {
        if(document.getElementById("login_username")) {
            console.log("moodle_login");
            postAndRedirectMoodle(username, password);
        }
    }

    // lcam
    if (window.location.hostname === "lcam.aitech.ac.jp" && autologin.lcam) {
        if (document.body.id === "login") {
            console.log("lcam_login");
            document.getElementById("userID").value = username;
            document.getElementsByName("password")[0].value = password;
            document.getElementsByClassName("btn_login")[0].click();
            showPopup();
        }
    }

    // aicot
    if (window.location.hostname === "aicot.aitech.ac.jp" && autologin.aicot) {
        console.log("aicot_login");
        document.getElementById("userNameInput").value = username + "@aitech.ac.jp";
        document.getElementById("passwordInput").value = password;
        document.getElementById("submitButton").click();
        showPopup();
    }

    // gakunin
    if (window.location.hostname === "gakunin.aitech.ac.jp" && autologin.gakunin) {
        console.log("gakunin_login");
        document.getElementById("username").value = username;
        document.getElementById("password").value = password;
        document.getElementsByName("_eventId_proceed")[0].click();
        showPopup();
    }

    // プリンターポイント
    if (window.location.hostname === "ipecprt.ipec.aitech.ac.jp") {
        console.log("printer_login");
        document.getElementById("Username").value = username;
        document.getElementById("Password").value = username;
        document.getElementById("um-login-submit").click();
        showPopup();
    }
}

// moodleログイン用
function postAndRedirectMoodle(username, password) {
    console.log("postAndRedirect");
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://cms.aitech.ac.jp/login/index.php";

    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "username";
    input.value = username;
    form.appendChild(input);

    const passinput = document.createElement("input");
    passinput.type = "hidden";
    passinput.name = "password";
    passinput.value = password;
    form.appendChild(passinput);

    document.body.appendChild(form);
    form.submit();

    // showPopup();
    // ポップアップメッセージを保存
    localStorage.setItem("redirectMessage", "自動ログインしました");
}


function showPopup(message = "自動ログインしました", first = true) {
    // ポップアップ要素を作成
    if(first){
        localStorage.setItem("redirectMessage", message);
    }

    const popup = document.createElement("div");
    popup.textContent = message;
    popup.style.position = "fixed";
    popup.style.bottom = "20px";
    popup.style.right = "20px";
    popup.style.padding = "10px 20px";
    popup.style.backgroundColor = "#333";
    popup.style.color = "#fff";
    popup.style.borderRadius = "5px";
    popup.style.boxShadow = "0 2px 5px rgba(0,0,0,0.3)";
    popup.style.zIndex = "1000";
    document.body.appendChild(popup);

    // 一定時間後に削除
    setTimeout(() => {
        popup.remove();
    }, 3000); // 3秒後に非表示
}