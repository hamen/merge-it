let me = "GITHUB_USERNAME"

var body = document.querySelector('body');
var time = new Date().getTime();

function getMergeButton() {
    return body.querySelector("button.btn-group-merge.btn-primary");
}

function getConfirmMergeButton() {
    return body.querySelector("button.btn-primary.js-merge-commit-button");
}

function isMyPr() {
    var assignee = body.querySelector('a.author')
    if (assignee != undefined) assignee = assignee.textContent
    return me == assignee
}

function isReadyToBeMerged() {
    let mergeButton = getMergeButton()
    return mergeButton != undefined && mergeButton.disabled == false
}

function mergePr() {
    getMergeButton(body).click();
    getConfirmMergeButton(body).click();
}

function refresh() {
    if (new Date().getTime() - time >= 60000) {
        window.location.reload(true);
    }
    else {
        setTimeout(refresh, 10000);
    }
}

(function () {
    const isMine = isMyPr();
    console.log("Is it mine: " + isMine)

    if (isMine) {
        const isMergiable = isReadyToBeMerged();
        console.log("Is it mergiable: " + isMergiable)

        if (isMergiable) {
            mergePr();
            alert("I just merged it!! 💣")
        } else {
            refresh()
        }
    }
})();
