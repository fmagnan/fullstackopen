sequenceDiagram
    participant browser
    participant server
    browser->>server: POST /new_note_spa
    activate server
    server-->>browser: {"message":"note created"}
    deactivate server