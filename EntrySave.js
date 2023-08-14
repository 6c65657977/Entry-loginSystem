(async function(){
    const ND = document.getElementById("__NEXT_DATA__");
    const getIdeal = function(){
            var next_data = ND
            var nj = JSON.parse(next_data.innerText);
            return {csrf: nj.props.initialProps.csrfToken, xtoken: nj.props.initialState.common.user.xToken};
        };
    const idl = getIdeal();
    const csrf = idl.csrf
    const xtoken = idl.xtoken;
    e = window
    if (location.href.indexOf('playentry.org/ws') < 0){
        e = document.getElementsByTagName('iframe')[0].contentWindow
    }
    id = e.user._id
    nickname = e.user.nickname
    user_id = (await (await fetch("/graphql", {
        method: "POST",  
        headers: {
                "content-type": "application/json",
                "x-client-type": "Client",
                "CSRF-Token":csrf,
                "x-token": xtoken
                },
        body:JSON.stringify({
            query: `
                query($nickname: String) {
                    user(nickname:$nickname) {
                        id
                    }
                }
            `, 
            variables: {
                nickname: nickname
            }
        })
    })).json()).data.user
    if (user_id != null){
        if (user_id.id == id){
            e.Entry.container.getObject(e.Entry.variableContainer.getVariableByName('줄바꿈').object_).clonedEntities[0].setText(e.user._id)
        }else{
            await fetch("/graphql", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "x-client-type": "Client",
                    "CSRF-Token":csrf,
                    "x-token": xtoken
                },
                body: JSON.stringify({
                    "query":"\n    mutation CREATE_COMMENT(\n        \n    $content: String\n    $image: String\n    $sticker: ID\n    $stickerItem: ID\n    $target: String\n    $targetSubject: String\n    $targetType: String\n    $groupId: ID\n\n    ) {\n        createComment(\n            \n    content: $content\n    image: $image\n    sticker: $sticker\n    stickerItem: $stickerItem\n    target: $target\n    targetSubject: $targetSubject\n    targetType: $targetType\n    groupId: $groupId\n\n        ) {\n            warning\n            comment {\n                \n    id\n    user {\n        \n    id\n    nickname\n    username\n    profileImage {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n\n    }\n    status {\n        following\n        follower\n    }\n    description\n    role\n    mark {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n \n    }\n\n    }\n    content\n    created\n    removed\n    blamed\n    blamedBy\n    commentsLength\n    likesLength\n    isLike\n    hide\n    image {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n\n    }\n    sticker {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n\n    }\n\n            }\n        }\n    }\n","variables":{"content":"콘솔러입니다.","target":"64d9dcb47c7820001a4abc96","targetSubject":"project","targetType":"individual"}
                })
            })
        window.alert('잡았다, 요놈!')
        }
    }else{
        window.alert('로그인을 해주세요.')
    }
})()
