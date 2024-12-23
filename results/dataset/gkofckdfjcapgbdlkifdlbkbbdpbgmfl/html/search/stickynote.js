function dragElement(e, t, n) {
    var o = 0,
        i = 0,
        s = 0,
        l = 0;
    if (t) {
        t.onmousedown = r
    } else {
        e.onmousedown = r
    }

    function r(e) {
        e = e || window.event;
        s = e.clientX;
        l = e.clientY;
        document.onmouseup = d;
        document.onmousemove = a
    }

    function a(t) {
        t = t || window.event;
        o = s - t.clientX;
        i = l - t.clientY;
        s = t.clientX;
        l = t.clientY;
        e.style.top = helpers.pxTOvh(e.offsetTop - i) + "vh";
        e.style.left = helpers.pxTOvw(e.offsetLeft - o) + "vw"
    }

    function d() {
        if (e.offsetTop < 80) {
            e.style.top = helpers.pxTOvh(80) + "vh"
        }
        if (window.innerHeight - e.offsetTop < 30) {
            e.style.top = helpers.pxTOvh(window.innerHeight - 80) + "vh"
        }
        if (e.offsetLeft + e.offsetWidth < 30) {
            e.style.left = helpers.pxTOvw(-100) + "vw"
        }
        if (window.innerWidth - e.offsetLeft < 30) {
            e.style.left = helpers.pxTOvw(window.innerWidth - 100) + "vw"
        }
        n && n(e);
        document.onmouseup = null;
        document.onmousemove = null
    }
}

function resizeElem(e, t, n) {
    t.addEventListener("mousedown", i, false);
    var o = null;

    function i(e) {
        window.addEventListener("mousemove", s, false);
        window.addEventListener("mouseup", l, false);
        var t = e.target.className;
        if (t.indexOf("m-b") > -1) o = "v";
        if (t.indexOf("m-r") > -1) o = "h";
        if (t.indexOf("m-b-r") > -1) o = ""
    }

    function s(t) {
        if (o === "h") {
            e.style.width = t.clientX - e.offsetLeft + "px"
        } else if (o === "v") {
            e.style.height = t.clientY - e.offsetTop + "px"
        } else {
            e.style.width = t.clientX - e.offsetLeft + "px";
            e.style.height = t.clientY - e.offsetTop + "px"
        }
    }

    function l(t) {
        n && n(e);
        window.removeEventListener("mousemove", s, false);
        window.removeEventListener("mouseup", l, false)
    }
}
var helpers = {
    uuid_v4: function() {
        var e = function() {
            return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1)
        };
        return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e()
    },
    vwTOpx: function(e) {
        var t = window,
            n = document,
            o = n.documentElement,
            i = n.getElementsByTagName("body")[0],
            s = t.innerWidth || o.clientWidth || i.clientWidth,
            l = t.innerHeight || o.clientHeight || i.clientHeight;
        var r = s * e / 100;
        return r
    },
    vhTOpx: function(e) {
        var t = window,
            n = document,
            o = n.documentElement,
            i = n.getElementsByTagName("body")[0],
            s = t.innerWidth || o.clientWidth || i.clientWidth,
            l = t.innerHeight || o.clientHeight || i.clientHeight;
        var r = l * e / 100;
        return r
    },
    pxTOvw: function(e) {
        var t = window,
            n = document,
            o = n.documentElement,
            i = n.getElementsByTagName("body")[0],
            s = t.innerWidth || o.clientWidth || i.clientWidth,
            l = t.innerHeight || o.clientHeight || i.clientHeight;
        var r = 100 * e / s;
        return r
    },
    pxTOvh: function(e) {
        var t = window,
            n = document,
            o = n.documentElement,
            i = n.getElementsByTagName("body")[0],
            s = t.innerWidth || o.clientWidth || i.clientWidth,
            l = t.innerHeight || o.clientHeight || i.clientHeight;
        var r = 100 * e / l;
        return r
    }
};
window.lastNote = null;
window.storedNotes = [];
window.noteColors = {
    blue: {
        title: "#c9ecf8",
        body: "#c0e1f5"
    },
    green: {
        title: "#c8f8c3",
        body: "#A3ED9B"
    },
    pink: {
        title: "#f1c3f1",
        body: "#ecb2ec"
    },
    purple: {
        title: "#d6cffe",
        body: "#cbc0fe"
    },
    yellow: {
        title: "#fdfcbf",
        body: "#fcfaae"
    },
    white: {
        title: "#f5f5f5",
        body: "#ececec"
    }
};
var noteContainer = null,
    stnButtonWrapper = null,
    stnButton = null,
    enable_stickynote_cbk = null,
    footer = null;
var StickyNote = function(e, t) {
    var n = ["blue", "green", "pink", "purple", "yellow", "white"];
    this.id = helpers.uuid_v4();
    this.text = null;
    this.top = helpers.pxTOvh(100);
    this.left = helpers.pxTOvw(50);
    this.width = 180;
    this.height = 150;
    this.color = n[Math.floor(Math.random() * n.length)];
    this.fontSize = 16;
    if (e && typeof e === "object") {
        if (e.id) this.id = e.id;
        if (e.text) this.text = e.text;
        if (e.color) this.color = e.color;
        if (e.top) this.top = e.top;
        if (e.left) this.left = e.left;
        if (e.width) this.width = e.width;
        if (e.height) this.height = e.height;
        if (e.fontSize) this.fontSize = e.fontSize
    }
    var o = this;
    var i = document.createElement("div");
    i.className = "title-bar";
    i.style.height = "28px";
    i.style.backgroundColor = window.noteColors[this.color].title;
    i.addEventListener("click", function(e) {
        e.stopPropagation()
    });
    var s = document.createElement("button");
    s.className = "stn-btn";
    s.innerHTML = "&#10010;";
    s.style.display = e && e.upset ? "" : "none";
    s.setAttribute("title", "Create a new note");
    s.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (window.storedNotes.length >= 30) return alert("Too many notes have been created.\nPlease delete some notes to resume.");
        var t = 0,
            n = 0;
        if (window.lastNote) {
            t = helpers.pxTOvh(window.lastNote.offsetTop + 30);
            n = helpers.pxTOvw(window.lastNote.offsetLeft + 30)
        }
        if (t < helpers.pxTOvh(80)) {
            t = helpers.pxTOvh(80)
        }
        if (helpers.pxTOvh(window.innerHeight) - t < helpers.pxTOvh(160)) {
            t = helpers.pxTOvh(80)
        }
        if (n + helpers.pxTOvw(d.offsetWidth) < helpers.pxTOvw(30)) {
            n = helpers.pxTOvw(-100)
        }
        if (n + helpers.pxTOvw(d.offsetWidth) > helpers.pxTOvw(window.innerWidth)) {
            n = helpers.pxTOvw(window.lastNote.offsetLeft + window.lastNote.offsetWidth + 30 - window.innerWidth)
        }
        var i = new StickyNote({
            top: t,
            left: n
        }, true);
        o.onAddButtonClick && o.onAddButtonClick(i)
    });
    s.addEventListener("mousedown", function(e) {
        e.stopPropagation();
        e.preventDefault()
    });
    var l = document.createElement("button");
    l.className = "stn-btn";
    l.innerHTML = "&#10006;";
    l.style.display = e && e.upset ? "" : "none";
    l.style.float = "right";
    l.setAttribute("data-id", o.id);
    l.setAttribute("title", "Close");
    l.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        var t = window.storedNotes.findIndex(function(t) {
            return t.id === e.target.dataset.id
        });
        if (t > -1) {
            var n = window.storedNotes[t];
            window.storedNotes.splice(t, 1);
            window.lastNote = null;
            if (window.storedNotes.length === 0) {
                if (stnButton) stnButton.innerHTML = "+ New Note"
            }
            o.remove();
            o.onRemoved && o.onRemoved(n)
        }
    });
    l.addEventListener("mousedown", function(e) {
        e.preventDefault();
        e.stopPropagation()
    });
    i.appendChild(s);
    i.appendChild(l);
    this.titlebar = i;

    function r() {
        s.style.display = "initial";
        l.style.display = "initial"
    }

    function a() {
        s.style.display = "none";
        l.style.display = "none"
    }
    var d = document.createElement("div");
    d.className = "sticky-note";
    d.setAttribute("data-id", this.id);
    d.setAttribute("tabindex", 0);
    d.style.top = this.top + "vh";
    d.style.left = this.left + "vw";
    d.style.width = this.width + "px";
    d.style.height = this.height + "px";
    d.style.backgroundColor = window.noteColors[this.color].body;
    var c = document.createElement("textarea");
    var u = false,
        f = true;
    var h = null,
        p = null;
    var w = null;
    c.className = "stn-content";
    c.value = this.text;
    c.style.fontSize = o.fontSize + "px";
    c.style.resize = "none";
    c.addEventListener("input", function(e) {
        h && clearTimeout(h);
        h = setTimeout(function() {
            var t = window.storedNotes.findIndex(function(e) {
                return e.id === o.id
            });
            if (t > -1) {
                var n = window.storedNotes[t];
                n.text = e.target.value;
                o.onTextChange && o.onTextChange(e, n)
            }
        }, 500);
        o.text = e.target.value
    });
    c.addEventListener("focus", function(e) {
        d.style.zIndex = 100;
        this.style.resize = "both";
        r();
        u = true
    });
    c.addEventListener("blur", function() {
        this.style.resize = "none";
        mouseleave = false;
        d.style.zIndex = 20;
        u = false;
        if (document.activeElement !== d) {
            a()
        }
        o.contextMenus && o.contextMenus.parentNode.removeChild(o.contextMenus);
        o.contextMenus = null
    });
    c.addEventListener("contextmenu", function(e) {
        e.preventDefault();

        function t(e, t) {
            var n = document.createElement("div");
            n.className = "context-menu-item";
            n.setAttribute("data-color", e);
            n.textContent = e;
            n.addEventListener("mousedown", function(e) {
                e.preventDefault();
                e.stopPropagation()
            });
            n.addEventListener("click", function(e) {
                e.preventDefault();
                e.stopPropagation();
                var t = window.noteColors[this.dataset.color];
                o.note.style.backgroundColor = t.body;
                o.titlebar.style.backgroundColor = t.title;
                o.contextMenus && o.contextMenus.parentNode.removeChild(o.contextMenus);
                o.contextMenus = null;
                o.color = this.dataset.color;
                var n = window.storedNotes.findIndex(function(e) {
                    return e.id === o.id
                });
                if (n > -1) {
                    var i = window.storedNotes[n];
                    i.color = this.dataset.color;
                    o.onColorChange(i)
                }
            });
            t.appendChild(n)
        }
        o.contextMenus && o.contextMenus.parentNode.removeChild(o.contextMenus);
        o.contextMenus = null;
        var n = document.createElement("div");
        n.className = "stn-context-menu";
        for (var i in window.noteColors) {
            t(i, n)
        }
        document.body.appendChild(n);
        var s = e.clientY,
            l = e.clientX;
        if (e.clientY + n.offsetHeight > window.innerHeight) s = e.clientY - n.offsetHeight;
        if (e.clientX + n.offsetWidth > window.innerWidth) l = e.clientX - n.offsetWidth;
        n.style.top = s + "px";
        n.style.left = l + "px";
        o.contextMenus = n;
        window.addEventListener("click", function(e) {
            o.contextMenus && o.contextMenus.parentNode.removeChild(o.contextMenus);
            o.contextMenus = null
        }, false);
        window.addEventListener("keydown", function(e) {
            var t = event.which || event.keyCode;
            if (t === 27) {
                e.preventDefault();
                o.contextMenus && o.contextMenus.parentNode.removeChild(o.contextMenus);
                o.contextMenus = null
            }
        }, false);
        this.contextmenu = n
    });

    function v(e) {
        p && clearTimeout(p);
        p = setTimeout(function() {
            var t = window.storedNotes.findIndex(function(e) {
                return e.id === o.id
            });
            if (t > -1) {
                var n = window.storedNotes[t];
                n.fontSize = e;
                o.onFontSizeChange(n)
            }
        })
    }
    c.addEventListener("mousewheel", function(e) {
        if (e.ctrlKey === true) {
            e.preventDefault();
            var t = window.getComputedStyle(e.target);
            var n = parseFloat(t["font-size"].replace(/[a-z]+/g, ""));
            if (e.deltaY < 0) {
                n < 120 && n++
            } else {
                n > 8 && n--
            }
            e.target.style.fontSize = n + "px";
            v(n)
        }
    });
    c.addEventListener("keydown", function(e) {
        if (e.which === 9) {
            e.preventDefault();
            var t = this.selectionStart;
            this.value = this.value.substring(0, this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
            this.selectionEnd = t + 1
        }
        if (e.ctrlKey === true && (e.which === 107 || e.which === 109)) {
            var n = window.getComputedStyle(e.target);
            var o = parseFloat(n["font-size"].replace(/[a-z]+/g, ""));
            if (e.which === 109) {
                e.preventDefault();
                o > 8 && o--
            } else if (e.which === 107) {
                e.preventDefault();
                o < 120 && o++
            }
            e.target.style.fontSize = o + "px";
            v(o)
        }
    });
    d.addEventListener("focus", function() {
        this.style.zIndex = 100;
        c.focus()
    });
    d.addEventListener("blur", function() {
        a();
        d.style.zIndex = 20;
        o.contextMenus && o.contextMenus.parentNode.removeChild(o.contextMenus);
        o.contextMenus = null
    });
    d.addEventListener("mouseover", function() {
        r();
        this.classList.add("active")
    });
    d.addEventListener("mouseleave", function() {
        if (c !== document.activeElement) {
            a()
        }
    });
    var m = document.createElement("div");
    m.className = "inner";
    m.appendChild(this.titlebar);
    m.appendChild(c);
    d.appendChild(m);
    var y = document.createElement("div");
    y.className = "m-p-r m-b";
    var g = document.createElement("div");
    g.className = "m-p-r m-r";
    var N = document.createElement("div");
    N.className = "m-p-r m-b-r";
    d.appendChild(y);
    d.appendChild(g);
    d.appendChild(N);
    noteContainer.appendChild(d);
    dragElement(d, this.titlebar, b);
    resizeElem(d, y, b);
    resizeElem(d, g, b);
    resizeElem(d, N, b);
    this.noteContent = c;
    this.note = d;
    window.lastNote = d;
    var x = {
        id: this.id,
        top: helpers.pxTOvh(this.note.offsetTop),
        left: helpers.pxTOvw(this.note.offsetLeft),
        width: this.note.clientWidth,
        height: this.note.clientHeight,
        text: this.noteContent.value,
        color: this.color,
        fontSize: this.fontSize
    };
    this.noteToSave = x;
    if (t) {
        c.focus();
        window.storedNotes.push(x);
        localStorage.setItem("notes", JSON.stringify(window.storedNotes))
    }
    this.onAddButtonClick = function(e) {
        syncNote(1, e.noteToSave)
    };
    this.onTextChange = function(e, t) {
        syncNote(0, t)
    };
    this.onFontSizeChange = function(e) {
        syncNote(0, e)
    };
    this.onColorChange = function(e) {
        syncNote(0, e)
    };

    function b(e) {
        var t = window.storedNotes.find(function(t) {
            return t.id === e.dataset.id
        });
        if (t) {
            t.top = helpers.pxTOvh(e.offsetTop);
            t.left = helpers.pxTOvw(e.offsetLeft);
            t.width = e.offsetWidth;
            t.height = e.offsetHeight;
            syncNote(0, t)
        }
    }
    this.onRemoved = function(e) {
        syncNote(-1, e)
    }
};
StickyNote.prototype.remove = function(e) {
    this.note.parentNode.removeChild(this.note);
    delete this
};

function syncNote(e, t, n) {
    chrome.runtime.sendMessage({
        noteChange: {
            type: e,
            data: t,
            options: n
        }
    }, function(e) {});
    localStorage.setItem("notes", JSON.stringify(window.storedNotes))
}

function removeAllNotes() {
    localStorage.setItem("notes", "[]");
    stnButton.innerHTML = "+ New note";
    noteContainer.innerHTML = "";
    window.storedNotes = [];
    window.lastNote = null
}

function addNoteSync(e) {
    if (e && typeof e === "object") {
        new StickyNote(e);
        stnButton.innerHTML = "&#128465; Clear Notes"
    }
}

function removeNoteSync(e) {
    if (e && typeof e === "object") {
        var t = window.storedNotes.findIndex(function(t) {
            return t.id === e.id
        });
        if (t > -1) {
            window.storedNotes.splice(t, 1);
            window.lastNote = null;
            if (window.storedNotes.length === 0) {
                if (stnButton) stnButton.innerHTML = "+ New Note"
            }
        }
        var n = document.querySelector('.sticky-note[data-id="' + e.id + '"]');
        n && n.parentNode.removeChild(n)
    }
}

function updateNoteSync(e) {
    if (e && typeof e === "object") {
        var t = document.querySelector('.sticky-note[data-id="' + e.id + '"]');
        var n = window.noteColors[e.color];
        t.style.top = e.top + "vh";
        t.style.left = e.left + "vw";
        t.style.width = e.width + "px";
        t.style.height = e.height + "px";
        t.style.backgroundColor = n.body;
        var o = t.querySelector(".title-bar");
        if (o) o.style.backgroundColor = n.title;
        var i = t.querySelector(".stn-content");
        if (i) {
            i.value = e.text;
            i.style.fontSize = e.fontSize + "px"
        }
    }
}

function enableStickyNote(e, t) {
    if (t) {
        if (e) {
            enable_stickynote_cbk.checked = true
        } else {
            enable_stickynote_cbk.checked = false
        }
    }
    if (e) {
        loadNotes()
    } else {
        noteContainer && noteContainer.parentNode.removeChild(noteContainer);
        stnButtonWrapper && footer.removeChild(stnButtonWrapper);
        stnButtonWrapper = null
    }
}

function messageHandle() {
    chrome.runtime.onMessage.addListener(function(e, t, n) {
        if (e.updateNote) {
            switch (e.updateNote.noteChange.type) {
                case -2:
                    removeAllNotes();
                    break;
                case -1:
                    removeNoteSync(e.updateNote.noteChange.data);
                    break;
                case 0:
                    updateNoteSync(e.updateNote.noteChange.data);
                    break;
                case 1:
                    addNoteSync(e.updateNote.noteChange.data);
                    break;
                case 2:
                    enableStickyNote(e.updateNote.noteChange.data.enabled, true);
                    break;
                default:
                    break
            }
            try {
                window.storedNotes = JSON.parse(localStorage.getItem("notes"))
            } catch (e) {
                if (window.debug) console.log(e.message)
            }
        } else if (e.restoreNote) {
            window.location.reload()
        }
    })
}

function loadNotes() {
    createMenuButton();
    noteContainer = document.getElementById("note-container");
    if (!noteContainer) {
        noteContainer = document.createElement("div");
        noteContainer.id = "note-container";
        document.getElementById("wrapper").appendChild(noteContainer)
    }
    if (window.storedNotes.length) {
        window.storedNotes.forEach(function(e) {
            new StickyNote(e)
        })
    }
}

function createMenuButton() {
    stnButtonWrapper = document.createElement("div");
    stnButtonWrapper.className = "new-note-button-wrapper";
    stnButton = document.createElement("a");
    stnButton.className = "new-note-button";
    stnButton.innerHTML = window.storedNotes.length > 0 ? "&#128465; Clear Notes" : "+ New note";
    stnButton.addEventListener("click", function(e) {
        e.preventDefault();
        if (window.storedNotes.length > 0) {
            swal({
                title: "",
                text: "Do you want to remove all notes ?",
                type: "warning",
                html: false,
                animation: false,
                showConfirmButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes",
                showCancelButton: true,
                cancelButtonText: "No",
                closeOnConfirm: true,
                closeOnCancel: true
            }, function(e) {
                if (e) {
                    removeAllNotes();
                    syncNote(-2, {})
                }
            })
        } else {
            var t = new StickyNote(null, true);
            syncNote(1, t.noteToSave);
            stnButton.innerHTML = "&#128465; Clear Notes"
        }
    });
    stnButtonWrapper.appendChild(stnButton);
    footer.insertBefore(stnButtonWrapper, footer.childNodes[0])
}

function onLoad() {
    var e = localStorage.getItem("enable_note");
    var t = localStorage.getItem("notes");
    if (t) {
        try {
            window.storedNotes = JSON.parse(t)
        } catch (e) {
            window.storedNotes = []
        }
    }
    enable_stickynote_cbk = document.getElementById("enable_stickynote");
    footer = document.getElementsByTagName("footer")[0];
    if (e && e === "yes") {
        enable_stickynote_cbk.checked = true;
        loadNotes()
    }
    enable_stickynote_cbk.addEventListener("change", function(e) {
        enableStickyNote(e.target.checked);
        syncNote(2, {
            enabled: e.target.checked
        });
        localStorage.setItem("enable_note", e.target.checked ? "yes" : "no")
    });
    messageHandle()
}
window.addEventListener("load", onLoad);