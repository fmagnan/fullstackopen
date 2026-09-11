sequenceDiagram
    participant browser
    participant server
    Note right of browser: The user enters text into the input box and clicks on save button
    browser->>server: POST /new_note
    activate server
    server-->>server: redirect /notes
    server-->>browser: HTML document
    deactivate server
    browser->>server: GET /main.css
    activate server
    server-->>browser: the css file
    deactivate server
    browser->>server: GET /main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server
    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server
    browser->>server: GET /data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server
    Note right of browser: The browser executes the callback function that renders the notes