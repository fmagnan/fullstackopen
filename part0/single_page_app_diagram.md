sequenceDiagram
    participant browser
    participant server
    browser->>server: GET /spa
    activate server
    server-->>browser: HTML document
    deactivate server
    browser->>server: GET /tag_assistant_api_bin.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server
    browser->>server: GET /main.css
    activate server
    server-->>browser: the css file
    deactivate server
    browser->>server: GET /spa.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server
    browser->>server: GET /data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server