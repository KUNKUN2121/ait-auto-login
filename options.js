function Save(){
    console.log("save")
    var id = document.getElementById("student_id").value;
    var pass = document.getElementById("student_pass").value;

    var check_lcam = document.getElementById("checkbox_lcam").checked;
    var check_moodle = document.getElementById("checkbox_moodle").checked;
    var check_aicot = document.getElementById("checkbox_aicot").checked;
    var check_gakunin = document.getElementById("checkbox_gakunin").checked;

    console.log(check_aicot)
    chrome.storage.local.set({
        id: id,
        pass: pass,
        autologin: {
            lcam: check_lcam,
            moodle: check_moodle,
            aicot: check_aicot,
            gakunin: check_gakunin
        }
    });
}

function Load(){
    chrome.storage.local.get([
        "id",
        "pass",
        "autologin",
    ],  function(value) {
        console.log("Load");
        console.log(value.autologin.lcam);
        console.log(value);

        // 入力フィールドの初期化
        if (value.id !== undefined) {
            document.getElementById("student_id").value = value.id;
        }
        if (value.pass !== undefined) {
            document.getElementById("student_pass").value = value.pass;
        }

        // チェックボックスの初期化（undefinedの場合デフォルトtrue）
        document.getElementById("checkbox_lcam").checked = value.autologin.lcam !== undefined ? value.autologin.lcam : true;
        document.getElementById("checkbox_moodle").checked = value.autologin.moodle !== undefined ? value.autologin.moodle : true;
        document.getElementById("checkbox_aicot").checked = value.autologin.aicot !== undefined ? value.autologin.aicot : true;
        document.getElementById("checkbox_gakunin").checked = value.autologin.gakunin !== undefined ? value.autologin.gakunin : true;
    });
}


// オプションページ（options.html）の読み込みと解析が完了したらLoad関数を実行
document.addEventListener('DOMContentLoaded', Load);

// 保存ボタン（save_button）がクリックされたらSave関数を実行
document.getElementById('save_button').addEventListener('click', Save);