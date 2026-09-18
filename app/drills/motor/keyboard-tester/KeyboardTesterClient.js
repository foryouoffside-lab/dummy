'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Keyboard, RotateCcw, Layers, CircleAlert, CircleCheck, Power } from 'lucide-react';

import DrillFooter from '@/components/drill/DrillFooter';
import DrillAccordion from '@/components/drill/DrillAccordion';

const ROWS_ANSI = [
  [
    [{ c: 'Escape', l: 'Esc', w: 1 }],
    [
      { c: 'F1', l: 'F1', w: 1 }, { c: 'F2', l: 'F2', w: 1 },
      { c: 'F3', l: 'F3', w: 1 }, { c: 'F4', l: 'F4', w: 1 },
    ],
    [
      { c: 'F5', l: 'F5', w: 1 }, { c: 'F6', l: 'F6', w: 1 },
      { c: 'F7', l: 'F7', w: 1 }, { c: 'F8', l: 'F8', w: 1 },
    ],
    [
      { c: 'F9', l: 'F9', w: 1 }, { c: 'F10', l: 'F10', w: 1 },
      { c: 'F11', l: 'F11', w: 1 }, { c: 'F12', l: 'F12', w: 1 },
    ],
  ],
  [
    [
      { c: 'Backquote', l: '`', w: 1 }, { c: 'Digit1', l: '1', w: 1 },
      { c: 'Digit2', l: '2', w: 1 }, { c: 'Digit3', l: '3', w: 1 },
      { c: 'Digit4', l: '4', w: 1 }, { c: 'Digit5', l: '5', w: 1 },
      { c: 'Digit6', l: '6', w: 1 }, { c: 'Digit7', l: '7', w: 1 },
      { c: 'Digit8', l: '8', w: 1 }, { c: 'Digit9', l: '9', w: 1 },
      { c: 'Digit0', l: '0', w: 1 }, { c: 'Minus', l: '-', w: 1 },
      { c: 'Equal', l: '=', w: 1 }, { c: 'Backspace', l: 'Backspace', w: 2 },
    ],
  ],
  [
    [
      { c: 'Tab', l: 'Tab', w: 1.5 }, { c: 'KeyQ', l: 'Q', w: 1 },
      { c: 'KeyW', l: 'W', w: 1 }, { c: 'KeyE', l: 'E', w: 1 },
      { c: 'KeyR', l: 'R', w: 1 }, { c: 'KeyT', l: 'T', w: 1 },
      { c: 'KeyY', l: 'Y', w: 1 }, { c: 'KeyU', l: 'U', w: 1 },
      { c: 'KeyI', l: 'I', w: 1 }, { c: 'KeyO', l: 'O', w: 1 },
      { c: 'KeyP', l: 'P', w: 1 }, { c: 'BracketLeft', l: '[', w: 1 },
      { c: 'BracketRight', l: ']', w: 1 }, { c: 'Backslash', l: '\\', w: 1.5 },
    ],
  ],
  [
    [
      { c: 'CapsLock', l: 'Caps', w: 1.75 }, { c: 'KeyA', l: 'A', w: 1 },
      { c: 'KeyS', l: 'S', w: 1 }, { c: 'KeyD', l: 'D', w: 1 },
      { c: 'KeyF', l: 'F', w: 1 }, { c: 'KeyG', l: 'G', w: 1 },
      { c: 'KeyH', l: 'H', w: 1 }, { c: 'KeyJ', l: 'J', w: 1 },
      { c: 'KeyK', l: 'K', w: 1 }, { c: 'KeyL', l: 'L', w: 1 },
      { c: 'Semicolon', l: ';', w: 1 }, { c: 'Quote', l: "'", w: 1 },
      { c: 'Enter', l: 'Enter', w: 2.25 },
    ],
  ],
  [
    [
      { c: 'ShiftLeft', l: 'Shift', w: 2.25 }, { c: 'KeyZ', l: 'Z', w: 1 },
      { c: 'KeyX', l: 'X', w: 1 }, { c: 'KeyC', l: 'C', w: 1 },
      { c: 'KeyV', l: 'V', w: 1 }, { c: 'KeyB', l: 'B', w: 1 },
      { c: 'KeyN', l: 'N', w: 1 }, { c: 'KeyM', l: 'M', w: 1 },
      { c: 'Comma', l: ',', w: 1 }, { c: 'Period', l: '.', w: 1 },
      { c: 'Slash', l: '/', w: 1 }, { c: 'ShiftRight', l: 'Shift', w: 2.75 },
    ],
  ],
  [
    [
      { c: 'ControlLeft', l: 'Ctrl', w: 1.25 }, { c: 'MetaLeft', l: 'Win', w: 1.25 },
      { c: 'AltLeft', l: 'Alt', w: 1.25 }, { c: 'Space', l: 'Space', w: 6.25 },
      { c: 'AltRight', l: 'Alt', w: 1.25 }, { c: 'MetaRight', l: 'Win', w: 1.25 },
      { c: 'ContextMenu', l: 'Menu', w: 1.25 }, { c: 'ControlRight', l: 'Ctrl', w: 1.25 },
    ],
  ],
];

const ROWS_ABNT2 = [
  ROWS_ANSI[0],
  [
    [
      { c: 'Backquote', l: '\'', w: 1 }, { c: 'Digit1', l: '1', w: 1 },
      { c: 'Digit2', l: '2', w: 1 }, { c: 'Digit3', l: '3', w: 1 },
      { c: 'Digit4', l: '4', w: 1 }, { c: 'Digit5', l: '5', w: 1 },
      { c: 'Digit6', l: '6', w: 1 }, { c: 'Digit7', l: '7', w: 1 },
      { c: 'Digit8', l: '8', w: 1 }, { c: 'Digit9', l: '9', w: 1 },
      { c: 'Digit0', l: '0', w: 1 }, { c: 'Minus', l: '-', w: 1 },
      { c: 'Equal', l: '=', w: 1 }, { c: 'Backspace', l: 'Backspace', w: 2 },
    ],
  ],
  [
    [
      { c: 'Tab', l: 'Tab', w: 1.5 }, { c: 'KeyQ', l: 'Q', w: 1 },
      { c: 'KeyW', l: 'W', w: 1 }, { c: 'KeyE', l: 'E', w: 1 },
      { c: 'KeyR', l: 'R', w: 1 }, { c: 'KeyT', l: 'T', w: 1 },
      { c: 'KeyY', l: 'Y', w: 1 }, { c: 'KeyU', l: 'U', w: 1 },
      { c: 'KeyI', l: 'I', w: 1 }, { c: 'KeyO', l: 'O', w: 1 },
      { c: 'KeyP', l: 'P', w: 1 }, { c: 'BracketLeft', l: '´ `', w: 1 },
      { c: 'BracketRight', l: '[ {', w: 1 }, { c: 'Backslash', l: '] }', w: 1.5 },
    ],
  ],
  [
    [
      { c: 'CapsLock', l: 'Caps', w: 1.75 }, { c: 'KeyA', l: 'A', w: 1 },
      { c: 'KeyS', l: 'S', w: 1 }, { c: 'KeyD', l: 'D', w: 1 },
      { c: 'KeyF', l: 'F', w: 1 }, { c: 'KeyG', l: 'G', w: 1 },
      { c: 'KeyH', l: 'H', w: 1 }, { c: 'KeyJ', l: 'J', w: 1 },
      { c: 'KeyK', l: 'K', w: 1 }, { c: 'KeyL', l: 'L', w: 1 },
      { c: 'Semicolon', l: 'Ç', w: 1 }, { c: 'Quote', l: '~ ^', w: 1 },
      { c: 'Enter', l: 'Enter', w: 2.25 },
    ],
  ],
  [
    [
      { c: 'ShiftLeft', l: 'Shift', w: 1.25 }, { c: 'IntlBackslash', l: '\\ |', w: 1 },
      { c: 'KeyZ', l: 'Z', w: 1 }, { c: 'KeyX', l: 'X', w: 1 },
      { c: 'KeyC', l: 'C', w: 1 }, { c: 'KeyV', l: 'V', w: 1 },
      { c: 'KeyB', l: 'B', w: 1 }, { c: 'KeyN', l: 'N', w: 1 },
      { c: 'KeyM', l: 'M', w: 1 }, { c: 'Comma', l: ', <', w: 1 },
      { c: 'Period', l: '. >', w: 1 }, { c: 'Slash', l: '; :', w: 1 },
      { c: 'IntlRo', l: '/ ?', w: 1 }, { c: 'ShiftRight', l: 'Shift', w: 1.75 },
    ],
  ],
  [
    [
      { c: 'ControlLeft', l: 'Ctrl', w: 1.25 }, { c: 'MetaLeft', l: 'Win', w: 1.25 },
      { c: 'AltLeft', l: 'Alt', w: 1.25 }, { c: 'Space', l: 'Space', w: 6.25 },
      { c: 'AltRight', l: 'AltGr', w: 1.25 }, { c: 'MetaRight', l: 'Win', w: 1.25 },
      { c: 'ContextMenu', l: 'Menu', w: 1.25 }, { c: 'ControlRight', l: 'Ctrl', w: 1.25 },
    ],
  ],
];

const ROWS_KOREAN = [
  ROWS_ANSI[0],
  ROWS_ANSI[1],
  [
    [
      { c: 'Tab', l: 'Tab', w: 1.5 }, { c: 'KeyQ', l: 'Q ㅂ', w: 1 },
      { c: 'KeyW', l: 'W ㅈ', w: 1 }, { c: 'KeyE', l: 'E ㄷ', w: 1 },
      { c: 'KeyR', l: 'R ㄱ', w: 1 }, { c: 'KeyT', l: 'T ㅅ', w: 1 },
      { c: 'KeyY', l: 'Y ㅛ', w: 1 }, { c: 'KeyU', l: 'U ㅕ', w: 1 },
      { c: 'KeyI', l: 'I ㅑ', w: 1 }, { c: 'KeyO', l: 'O ㅐ', w: 1 },
      { c: 'KeyP', l: 'P ㅔ', w: 1 }, { c: 'BracketLeft', l: '[', w: 1 },
      { c: 'BracketRight', l: ']', w: 1 }, { c: 'Backslash', l: '\\', w: 1.5 },
    ],
  ],
  [
    [
      { c: 'CapsLock', l: 'Caps', w: 1.75 }, { c: 'KeyA', l: 'A ㅁ', w: 1 },
      { c: 'KeyS', l: 'S ㄴ', w: 1 }, { c: 'KeyD', l: 'D ㅇ', w: 1 },
      { c: 'KeyF', l: 'F ㄹ', w: 1 }, { c: 'KeyG', l: 'G ㅎ', w: 1 },
      { c: 'KeyH', l: 'H ㅗ', w: 1 }, { c: 'KeyJ', l: 'J ㅓ', w: 1 },
      { c: 'KeyK', l: 'K ㅏ', w: 1 }, { c: 'KeyL', l: 'L ㅣ', w: 1 },
      { c: 'Semicolon', l: ';', w: 1 }, { c: 'Quote', l: "'", w: 1 },
      { c: 'Enter', l: 'Enter', w: 2.25 },
    ],
  ],
  [
    [
      { c: 'ShiftLeft', l: 'Shift', w: 2.25 }, { c: 'KeyZ', l: 'Z ㅋ', w: 1 },
      { c: 'KeyX', l: 'X ㅌ', w: 1 }, { c: 'KeyC', l: 'C ㅊ', w: 1 },
      { c: 'KeyV', l: 'V ㅍ', w: 1 }, { c: 'KeyB', l: 'B ㅠ', w: 1 },
      { c: 'KeyN', l: 'N ㅜ', w: 1 }, { c: 'KeyM', l: 'M ㅡ', w: 1 },
      { c: 'Comma', l: ',', w: 1 }, { c: 'Period', l: '.', w: 1 },
      { c: 'Slash', l: '/', w: 1 }, { c: 'ShiftRight', l: 'Shift', w: 2.75 },
    ],
  ],
  [
    [
      { c: 'ControlLeft', l: 'Ctrl', w: 1.25 }, { c: 'MetaLeft', l: 'Win', w: 1.25 },
      { c: 'AltLeft', l: 'Alt', w: 1.25 }, { c: 'Hanja', l: '한자', w: 1 },
      { c: 'Space', l: 'Space', w: 4.25 }, { c: 'HangulMode', l: '한/영', w: 1 },
      { c: 'AltRight', l: 'Alt', w: 1.25 }, { c: 'MetaRight', l: 'Win', w: 1.25 },
      { c: 'ContextMenu', l: 'Menu', w: 1.25 }, { c: 'ControlRight', l: 'Ctrl', w: 1.25 },
    ],
  ],
];

const ROWS_AZERTY = [
  ROWS_ANSI[0],
  [
    [
      { c: 'Backquote', l: '²', w: 1 }, { c: 'Digit1', l: '& 1', w: 1 },
      { c: 'Digit2', l: 'é 2 ~', w: 1 }, { c: 'Digit3', l: '" 3 #', w: 1 },
      { c: 'Digit4', l: '\' 4 {', w: 1 }, { c: 'Digit5', l: '( 5 [', w: 1 },
      { c: 'Digit6', l: '- 6 |', w: 1 }, { c: 'Digit7', l: 'è 7 `', w: 1 },
      { c: 'Digit8', l: '_ 8 \\', w: 1 }, { c: 'Digit9', l: 'ç 9 ^', w: 1 },
      { c: 'Digit0', l: 'à 0 @', w: 1 }, { c: 'Minus', l: ') ° ]', w: 1 },
      { c: 'Equal', l: '= + }', w: 1 }, { c: 'Backspace', l: 'Backspace', w: 2 },
    ],
  ],
  [
    [
      { c: 'Tab', l: 'Tab', w: 1.5 }, { c: 'KeyQ', l: 'A', w: 1 },
      { c: 'KeyW', l: 'Z', w: 1 }, { c: 'KeyE', l: 'E €', w: 1 },
      { c: 'KeyR', l: 'R', w: 1 }, { c: 'KeyT', l: 'T', w: 1 },
      { c: 'KeyY', l: 'Y', w: 1 }, { c: 'KeyU', l: 'U', w: 1 },
      { c: 'KeyI', l: 'I', w: 1 }, { c: 'KeyO', l: 'O', w: 1 },
      { c: 'KeyP', l: 'P', w: 1 }, { c: 'BracketLeft', l: '^ ¨', w: 1 },
      { c: 'BracketRight', l: '$ £', w: 1 }, { c: 'Backslash', l: '* µ', w: 1.5 },
    ],
  ],
  [
    [
      { c: 'CapsLock', l: 'Caps', w: 1.75 }, { c: 'KeyA', l: 'Q', w: 1 },
      { c: 'KeyS', l: 'S', w: 1 }, { c: 'KeyD', l: 'D', w: 1 },
      { c: 'KeyF', l: 'F', w: 1 }, { c: 'KeyG', l: 'G', w: 1 },
      { c: 'KeyH', l: 'H', w: 1 }, { c: 'KeyJ', l: 'J', w: 1 },
      { c: 'KeyK', l: 'K', w: 1 }, { c: 'KeyL', l: 'L', w: 1 },
      { c: 'Semicolon', l: 'M', w: 1 }, { c: 'Quote', l: 'ù %', w: 1 },
      { c: 'Enter', l: 'Enter', w: 2.25 },
    ],
  ],
  [
    [
      { c: 'ShiftLeft', l: 'Shift', w: 1.25 }, { c: 'IntlBackslash', l: '< >', w: 1 },
      { c: 'KeyZ', l: 'W', w: 1 }, { c: 'KeyX', l: 'X', w: 1 },
      { c: 'KeyC', l: 'C', w: 1 }, { c: 'KeyV', l: 'V', w: 1 },
      { c: 'KeyB', l: 'B', w: 1 }, { c: 'KeyN', l: 'N', w: 1 },
      { c: 'Comma', l: ', ?', w: 1 }, { c: 'Period', l: '; .', w: 1 },
      { c: 'Slash', l: ': /', w: 1 }, { c: 'ShiftRight', l: 'Shift', w: 2.75 },
    ],
  ],
  [
    [
      { c: 'ControlLeft', l: 'Ctrl', w: 1.25 }, { c: 'MetaLeft', l: 'Win', w: 1.25 },
      { c: 'AltLeft', l: 'Alt', w: 1.25 }, { c: 'Space', l: 'Space', w: 6.25 },
      { c: 'AltRight', l: 'AltGr', w: 1.25 }, { c: 'MetaRight', l: 'Win', w: 1.25 },
      { c: 'ContextMenu', l: 'Menu', w: 1.25 }, { c: 'ControlRight', l: 'Ctrl', w: 1.25 },
    ],
  ],
];

const ROWS_JIS = [
  ROWS_ANSI[0],
  [
    [
      { c: 'Backquote', l: '半/全', w: 1 }, { c: 'Digit1', l: '1 ぬ', w: 1 },
      { c: 'Digit2', l: '2 ふ', w: 1 }, { c: 'Digit3', l: '3 あ', w: 1 },
      { c: 'Digit4', l: '4 う', w: 1 }, { c: 'Digit5', l: '5 え', w: 1 },
      { c: 'Digit6', l: '6 お', w: 1 }, { c: 'Digit7', l: '7 や', w: 1 },
      { c: 'Digit8', l: '8 ゆ', w: 1 }, { c: 'Digit9', l: '9 よ', w: 1 },
      { c: 'Digit0', l: '0 わ', w: 1 }, { c: 'Minus', l: '- ほ', w: 1 },
      { c: 'Equal', l: '^ へ', w: 1 }, { c: 'IntlYen', l: '¥', w: 1 },
      { c: 'Backspace', l: 'Back', w: 1 },
    ],
  ],
  [
    [
      { c: 'Tab', l: 'Tab', w: 1.5 }, { c: 'KeyQ', l: 'Q た', w: 1 },
      { c: 'KeyW', l: 'W て', w: 1 }, { c: 'KeyE', l: 'E い', w: 1 },
      { c: 'KeyR', l: 'R す', w: 1 }, { c: 'KeyT', l: 'T か', w: 1 },
      { c: 'KeyY', l: 'Y ん', w: 1 }, { c: 'KeyU', l: 'U な', w: 1 },
      { c: 'KeyI', l: 'I に', w: 1 }, { c: 'KeyO', l: 'O ら', w: 1 },
      { c: 'KeyP', l: 'P せ', w: 1 }, { c: 'BracketLeft', l: '@ ゛', w: 1 },
      { c: 'BracketRight', l: '[ ゜', w: 1 }, { c: 'Enter', l: 'Enter', w: 1.5 },
    ],
  ],
  [
    [
      { c: 'CapsLock', l: 'Caps', w: 1.75 }, { c: 'KeyA', l: 'A ち', w: 1 },
      { c: 'KeyS', l: 'S と', w: 1 }, { c: 'KeyD', l: 'D し', w: 1 },
      { c: 'KeyF', l: 'F は', w: 1 }, { c: 'KeyG', l: 'G き', w: 1 },
      { c: 'KeyH', l: 'H く', w: 1 }, { c: 'KeyJ', l: 'J ま', w: 1 },
      { c: 'KeyK', l: 'K の', w: 1 }, { c: 'KeyL', l: 'L り', w: 1 },
      { c: 'Semicolon', l: '; れ', w: 1 }, { c: 'Quote', l: ': け', w: 1 },
      { c: 'Backslash', l: '] む', w: 1.25 },
    ],
  ],
  [
    [
      { c: 'ShiftLeft', l: 'Shift', w: 2 }, { c: 'KeyZ', l: 'Z つ', w: 1 },
      { c: 'KeyX', l: 'X さ', w: 1 }, { c: 'KeyC', l: 'C そ', w: 1 },
      { c: 'KeyV', l: 'V ひ', w: 1 }, { c: 'KeyB', l: 'B こ', w: 1 },
      { c: 'KeyN', l: 'N み', w: 1 }, { c: 'KeyM', l: 'M も', w: 1 },
      { c: 'Comma', l: ', ね', w: 1 }, { c: 'Period', l: '. る', w: 1 },
      { c: 'Slash', l: '/ め', w: 1 }, { c: 'IntlRo', l: '\\ ろ', w: 1 },
      { c: 'ShiftRight', l: 'Shift', w: 2 },
    ],
  ],
  [
    [
      { c: 'ControlLeft', l: 'Ctrl', w: 1.25 }, { c: 'MetaLeft', l: 'Win', w: 1.25 },
      { c: 'AltLeft', l: 'Alt', w: 1.25 }, { c: 'NonConvert', l: '無変換', w: 1 },
      { c: 'Space', l: 'Space', w: 3.25 }, { c: 'Convert', l: '変換', w: 1 },
      { c: 'KanaMode', l: 'かな', w: 1 }, { c: 'AltRight', l: 'Alt', w: 1.25 },
      { c: 'ContextMenu', l: 'Menu', w: 1 }, { c: 'ControlRight', l: 'Ctrl', w: 1.25 },
    ],
  ],
];

const NAV = [
  { c: 'Insert', l: 'Ins', col: 1, row: 2 },
  { c: 'Home', l: 'Home', col: 2, row: 2 },
  { c: 'PageUp', l: 'PgUp', col: 3, row: 2 },
  { c: 'Delete', l: 'Del', col: 1, row: 3 },
  { c: 'End', l: 'End', col: 2, row: 3 },
  { c: 'PageDown', l: 'PgDn', col: 3, row: 3 },
  { c: 'ArrowUp', l: '▲', col: 2, row: 5 },
  { c: 'ArrowLeft', l: '◀', col: 1, row: 6 },
  { c: 'ArrowDown', l: '▼', col: 2, row: 6 },
  { c: 'ArrowRight', l: '▶', col: 3, row: 6 },
];

const NUMPAD = [
  { c: 'NumLock', l: 'Num', col: 1, row: 2 },
  { c: 'NumpadDivide', l: '/', col: 2, row: 2 },
  { c: 'NumpadMultiply', l: '*', col: 3, row: 2 },
  { c: 'NumpadSubtract', l: '-', col: 4, row: 2 },
  { c: 'Numpad7', l: '7', col: 1, row: 3 },
  { c: 'Numpad8', l: '8', col: 2, row: 3 },
  { c: 'Numpad9', l: '9', col: 3, row: 3 },
  { c: 'NumpadAdd', l: '+', col: 4, row: 3, rowSpan: 2 },
  { c: 'Numpad4', l: '4', col: 1, row: 4 },
  { c: 'Numpad5', l: '5', col: 2, row: 4 },
  { c: 'Numpad6', l: '6', col: 3, row: 4 },
  { c: 'Numpad1', l: '1', col: 1, row: 5 },
  { c: 'Numpad2', l: '2', col: 2, row: 5 },
  { c: 'Numpad3', l: '3', col: 3, row: 5 },
  { c: 'NumpadEnter', l: 'Ent', col: 4, row: 5, rowSpan: 2 },
  { c: 'Numpad0', l: '0', col: 1, row: 6, colSpan: 2 },
  { c: 'NumpadDecimal', l: '.', col: 3, row: 6 },
];

const LAYOUT_MAP = {
  ansi: ROWS_ANSI,
  abnt2: ROWS_ABNT2,
  korean: ROWS_KOREAN,
  azerty: ROWS_AZERTY,
  jis: ROWS_JIS,
};

const LAYOUT_OPTIONS = [
  { id: 'ansi', label: 'US ANSI' },
  { id: 'abnt2', label: 'ABNT2 (Brasil)' },
  { id: 'korean', label: '한글 (한국)' },
  { id: 'azerty', label: 'AZERTY (France)' },
  { id: 'jis', label: 'JIS (日本)' },
];

const ALL_CODES = (() => {
  const set = new Set();
  Object.values(LAYOUT_MAP).forEach((rows) => {
    rows.forEach((row) => row.forEach((cluster) => cluster.forEach((k) => set.add(k.c))));
  });
  NAV.forEach((k) => set.add(k.c));
  NUMPAD.forEach((k) => set.add(k.c));
  return Array.from(set);
})();


const PASSTHROUGH = new Set(['F5', 'F11', 'F12']);

const KEY_BASE =
  'relative flex items-end justify-center rounded-md border text-[10px] sm:text-[11px] font-semibold select-none transition-colors duration-75 pb-1 px-1 overflow-hidden';

function tone(state) {
  if (state === 'tested') return 'border-emerald-500/40 bg-emerald-500/15 text-emerald-200';
  if (state === 'down') return 'border-cyan-400/70 bg-cyan-400/30 text-white';
  return 'border-white/10 bg-white/[0.03] text-slate-400';
}

function Key({ k, state, unit }) {
  return (
    <div
      data-code={k.c}
      className={`${KEY_BASE} ${tone(state)}`}
      style={{ width: `calc(${k.w} * ${unit})`, height: unit }}
    >
      <span className="truncate leading-none">{k.l}</span>
    </div>
  );
}

function GridKey({ k, state }) {
  return (
    <div
      data-code={k.c}
      className={`${KEY_BASE} ${tone(state)}`}
      style={{
        gridColumn: `${k.col} / span ${k.colSpan || 1}`,
        gridRow: `${k.row} / span ${k.rowSpan || 1}`,
      }}
    >
      <span className="truncate leading-none">{k.l}</span>
    </div>
  );
}

const DEFAULT_COPY = {
  title: 'Keyboard Tester',
  subtitle: 'Free Online Keyboard Test — Check Every Key',
  intro:
    'Press every key on your keyboard. Each one lights up as it registers and stays green once confirmed working. Keys that never light up are not reaching the browser — the symptom of a dead switch, a stuck key, or a driver problem. Nothing is uploaded and nothing is stored.',
  keysConfirmed: 'Keys confirmed',
  rollover: 'Rollover',
  capturing: 'Capturing',
  paused: 'Paused',
  reset: 'Reset',
  captureNotice:
    'Key capture is on, so shortcuts are suppressed while you test. Press Shift + Esc or click Capturing to release your keyboard.',
  lastKeyEvent: 'Last key event',
  eventCode: 'event.code',
  eventKey: 'event.key',
  keyCode: 'keyCode',
  location: 'location',
  autoRepeat: 'auto-repeat',
  yes: 'yes',
  no: 'no',
  space: '(space)',
  pressAnyKey: 'Press any key to see what the browser receives.',
  keysNotOnLayout: 'Keys not on the standard layout above',
  notYetConfirmed: 'Not yet confirmed',
  allConfirmed: 'Every key on the layout registered. Your keyboard is working.',
  untestedSingular:
    'key still to press. A key that will not register after several firm presses is the one to investigate.',
  untestedPlural:
    'keys still to press. A key that will not register after several firm presses is the one to investigate.',
  mobileWarning:
    'This tool needs a physical keyboard. Open it on a desktop or laptop, or connect an external keyboard to test it.',
  howTitle: 'How to test your keyboard',
  howStep1: 'Press every key once, working left to right across each row.',
  howStep2: 'Each key turns cyan while held and green once it has registered at least once.',
  howStep3:
    'Watch the “Not yet confirmed” list empty out. Anything left after a firm press is a suspect key.',
  howStep4:
    'Hold several keys at once to read your rollover count — the number of simultaneous presses your keyboard reports.',
  rolloverTitle: 'Key rollover and ghosting',
  rolloverP1:
    'Rollover is how many keys your keyboard can report at the same time. Many membrane keyboards manage two to six before extra presses are silently dropped, which is called ghosting. Keyboards advertising NKRO report every key pressed.',
  rolloverP2:
    'Hold a handful of keys together and read the Rollover figure above. If it stops climbing at three or four, that is your keyboard’s limit rather than a fault. Note that the operating system reserves some combinations, so a few will never reach the browser regardless of hardware.',
  limitsTitle: 'What this test cannot tell you',
  limitsP1:
    'This page sees what the browser receives, which is the end of a long chain: switch, controller, cable or wireless link, driver, then operating system. A key that fails here has a fault somewhere along that chain, but this test cannot say where.',
  limitsP2:
    'Some keys never reach a web page at all. The operating system claims combinations such as Alt+Tab and Ctrl+Alt+Delete before any browser sees them, and F5, F11 and F12 are left to the browser here so you keep refresh, fullscreen and developer tools. Those being absent is normal and is not a hardware fault.',
};

export default function KeyboardTesterClient({ copy = {}, defaultLayout = 'ansi' } = {}) {
  const t = { ...DEFAULT_COPY, ...copy };
  const [activeLayout, setActiveLayout] = useState(defaultLayout);
  const rows = LAYOUT_MAP[activeLayout] || LAYOUT_MAP.ansi;
  const [tested, setTested] = useState(() => new Set());
  const [down, setDown] = useState(() => new Set());
  const [capture, setCapture] = useState(true);
  const [last, setLast] = useState(null);
  const [maxSimul, setMaxSimul] = useState(0);
  const [unknown, setUnknown] = useState([]);
  const [openPanel, setOpenPanel] = useState(null);
  const downRef = useRef(new Set());

  const unit = 'clamp(22px, 3.4vw, 42px)';

  const onKeyDown = useCallback(
    (e) => {
      if (!capture) return;
      if (e.key === 'Escape' && e.shiftKey) {
        setCapture(false);
        return;
      }
      if (!PASSTHROUGH.has(e.code)) e.preventDefault();

      downRef.current.add(e.code);
      const nextDown = new Set(downRef.current);
      setDown(nextDown);
      setMaxSimul((m) => Math.max(m, nextDown.size));
      setTested((t) => {
        if (t.has(e.code)) return t;
        const n = new Set(t);
        n.add(e.code);
        return n;
      });
      if (!ALL_CODES.includes(e.code)) {
        setUnknown((u) =>
          u.some((x) => x.code === e.code) ? u : [...u, { code: e.code, key: e.key }]
        );
      }
      setLast({ code: e.code, key: e.key, which: e.keyCode, repeat: e.repeat, loc: e.location });
    },
    [capture]
  );

  const onKeyUp = useCallback(
    (e) => {
      if (!capture) return;
      if (!PASSTHROUGH.has(e.code)) e.preventDefault();
      downRef.current.delete(e.code);
      setDown(new Set(downRef.current));
    },
    [capture]
  );

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [onKeyDown, onKeyUp]);

  useEffect(() => {
    const clear = () => {
      downRef.current.clear();
      setDown(new Set());
    };
    window.addEventListener('blur', clear);
    return () => window.removeEventListener('blur', clear);
  }, []);

  const reset = () => {
    downRef.current.clear();
    setTested(new Set());
    setDown(new Set());
    setMaxSimul(0);
    setUnknown([]);
    setLast(null);
  };

  const stateOf = (code) => {
    if (down.has(code)) return 'down';
    if (tested.has(code)) return 'tested';
    return 'idle';
  };

  const toggle = (id) => setOpenPanel((c) => (c === id ? null : id));

  const activeCodes = useMemo(() => {
    const set = new Set();
    rows.forEach((row) => row.forEach((cluster) => cluster.forEach((k) => set.add(k.c))));
    NAV.forEach((k) => set.add(k.c));
    NUMPAD.forEach((k) => set.add(k.c));
    return Array.from(set);
  }, [rows]);

  const totalKeys = activeCodes.length;
  const testedCount = useMemo(() => {
    let count = 0;
    activeCodes.forEach((c) => {
      if (tested.has(c)) count++;
    });
    return count;
  }, [activeCodes, tested]);

  const pct = Math.round((testedCount / totalKeys) * 100);
  const untested = activeCodes.filter((c) => !tested.has(c));

  return (
    <div className="min-h-screen bg-[#05070a] text-white flex flex-col">
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 flex flex-col gap-6">
        <div className="text-left">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            {t.title}
            <span data-seo-kw="1" className="block text-sm font-semibold text-slate-400 mt-1">
              {t.subtitle}
            </span>
          </h1>
          <p className="mt-3 text-sm text-slate-400 leading-relaxed">
            {t.intro}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-[220px]">
            <div className="flex items-baseline justify-between mb-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {t.keysConfirmed}
              </span>
              <span className="text-sm font-bold text-emerald-300 tabular-nums">
                {testedCount} / {totalKeys}
              </span>
            </div>
            <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-200"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/[0.03]">
              <Keyboard className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <label htmlFor="keyboard-layout-select" className="sr-only">Layout</label>
              <select
                id="keyboard-layout-select"
                value={activeLayout}
                onChange={(e) => setActiveLayout(e.target.value)}
                className="bg-transparent text-xs font-semibold text-slate-200 focus:outline-none cursor-pointer pr-1"
              >
                {LAYOUT_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id} className="bg-slate-900 text-slate-200">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="px-3 py-2 rounded-lg border border-white/10 bg-white/[0.03] text-center">
              <div className="text-[10px] uppercase tracking-wider text-slate-500">{t.rollover}</div>
              <div className="text-sm font-bold text-cyan-300 tabular-nums">{maxSimul}</div>
            </div>
            <button
              onClick={() => setCapture((c) => !c)}
              className={`px-3 py-2 rounded-lg border text-xs font-semibold flex items-center gap-2 transition-colors ${
                capture
                  ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-200 hover:bg-cyan-400/20'
                  : 'border-white/10 bg-white/[0.03] text-slate-400 hover:bg-white/[0.06]'
              }`}
            >
              <Power className="w-3.5 h-3.5" />
              {capture ? t.capturing : t.paused}
            </button>
            <button
              onClick={reset}
              className="px-3 py-2 rounded-lg border border-white/10 bg-white/[0.03] text-xs font-semibold text-slate-300 hover:bg-white/[0.06] flex items-center gap-2 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              {t.reset}
            </button>
          </div>
        </div>

        {capture && (
          <p className="text-xs text-amber-300/80 flex items-center gap-2">
            <CircleAlert className="w-3.5 h-3.5 shrink-0" />
            {t.captureNotice}
          </p>
        )}

        <div className="overflow-x-auto -mx-4 px-4 pb-2">
          <div className="inline-flex gap-3 min-w-max">
            <div className="flex flex-col gap-1">
              {rows.map((row, ri) => (
                <div key={ri} className={`flex gap-1 ${ri === 0 ? 'mb-2' : ''}`}>
                  {row.map((cluster, ci) => (
                    <div key={ci} className={`flex gap-1 ${ci > 0 ? 'ml-3' : ''}`}>
                      {cluster.map((k) => (
                        <Key key={k.c} k={k} state={stateOf(k.c)} unit={unit} />
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div
              className="grid gap-1"
              style={{
                gridTemplateColumns: `repeat(3, ${unit})`,
                gridTemplateRows: `calc(${unit} + 8px) repeat(5, ${unit})`,
              }}
            >
              {NAV.map((k) => (
                <GridKey key={k.c} k={k} state={stateOf(k.c)} />
              ))}
            </div>

            <div
              className="grid gap-1"
              style={{
                gridTemplateColumns: `repeat(4, ${unit})`,
                gridTemplateRows: `calc(${unit} + 8px) repeat(5, ${unit})`,
              }}
            >
              {NUMPAD.map((k) => (
                <GridKey key={k.c} k={k} state={stateOf(k.c)} />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.012] p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
              {t.lastKeyEvent}
            </div>
            {last ? (
              <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <dt className="text-slate-500">{t.eventCode}</dt>
                <dd className="font-mono text-cyan-300">{last.code}</dd>
                <dt className="text-slate-500">{t.eventKey}</dt>
                <dd className="font-mono text-cyan-300">{last.key === ' ' ? t.space : last.key}</dd>
                <dt className="text-slate-500">{t.keyCode}</dt>
                <dd className="font-mono text-slate-300 tabular-nums">{last.which}</dd>
                <dt className="text-slate-500">{t.location}</dt>
                <dd className="font-mono text-slate-300 tabular-nums">{last.loc}</dd>
                <dt className="text-slate-500">{t.autoRepeat}</dt>
                <dd className="font-mono text-slate-300">{last.repeat ? t.yes : t.no}</dd>
              </dl>
            ) : (
              <p className="text-sm text-slate-500">
                {t.pressAnyKey}
              </p>
            )}
            {unknown.length > 0 && (
              <div className="mt-4 pt-3 border-t border-white/[0.06]">
                <div className="text-xs text-slate-500 mb-2">
                  {t.keysNotOnLayout}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {unknown.map((u) => (
                    <span
                      key={u.code}
                      className="px-2 py-1 rounded border border-violet-400/40 bg-violet-400/10 text-violet-200 font-mono text-[11px]"
                    >
                      {u.code || u.key}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="rounded-xl border border-white/[0.07] bg-white/[0.012] p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
              {t.notYetConfirmed}
            </div>
            {untested.length === 0 ? (
              <p className="text-sm text-emerald-300 flex items-center gap-2">
                <CircleCheck className="w-4 h-4" />
                {t.allConfirmed}
              </p>
            ) : (
              <>
                <p className="text-sm text-slate-400 mb-3">
                  {untested.length}{' '}
                  {untested.length === 1 ? t.untestedSingular : t.untestedPlural}
                </p>
                <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto">
                  {untested.map((c) => (
                    <span
                      key={c}
                      className="px-2 py-0.5 rounded border border-white/10 bg-white/[0.03] text-slate-400 font-mono text-[11px]"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="md:hidden rounded-xl border border-amber-500/20 bg-amber-500/[0.06] p-4 text-sm text-amber-200/90">
          {t.mobileWarning}
        </div>

        <div>
          <DrillAccordion
            id="how"
            title={t.howTitle}
            icon={Keyboard}
            isOpen={openPanel === 'how'}
            onToggle={() => toggle('how')}
          >
            <ol className="list-decimal ml-4 space-y-2">
              <li>{t.howStep1}</li>
              <li>{t.howStep2}</li>
              <li>{t.howStep3}</li>
              <li>{t.howStep4}</li>
            </ol>
          </DrillAccordion>

          <DrillAccordion
            id="rollover"
            title={t.rolloverTitle}
            icon={Layers}
            isOpen={openPanel === 'rollover'}
            onToggle={() => toggle('rollover')}
          >
            <p>{t.rolloverP1}</p>
            <p className="mt-2">{t.rolloverP2}</p>
          </DrillAccordion>

          <DrillAccordion
            id="limits"
            title={t.limitsTitle}
            icon={CircleAlert}
            iconColor="text-amber-400"
            iconBg="bg-amber-500/10 border-amber-500/20"
            isOpen={openPanel === 'limits'}
            onToggle={() => toggle('limits')}
          >
            <p>{t.limitsP1}</p>
            <p className="mt-2">{t.limitsP2}</p>
          </DrillAccordion>
        </div>
      </main>

      <DrillFooter />
    </div>
  );
}
