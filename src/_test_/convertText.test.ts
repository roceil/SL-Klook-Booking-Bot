import convertText from '../lib/convertText';  // 請確保路徑正確

const adultInput = `
訂單編號: NUQ576054
預訂時間: 2023-10-24 09:30:00 (GMT+8)
訂單狀態: 已確認
產品編號：:

22886
產品名稱：:

小琉球船票｜屏東東港漁港 - 小琉球｜船票＆拼車接駁
方案名稱:

往返船票 · 不含接駁 · 無機車租借 · 東琉聯營處（保證新船）
成本價總額:

2,190.00 TWD
單位:

全票 x 6
參加時間:

2023-11-04
憑證類型:

KLOOKCODE
訂單確認時效:

立即確認並發送憑證
確認時間:

2023-10-24 09:31:53
訂單來源:

Klook
全名:

劉 建軍
電子信箱:

Neilliu0424@gmail.com
手機號碼:

886-0930101253
姓名:

劉建軍
`;

const adultRoundTripInput = `
訂單編號: FKH699004
預訂時間: 2023-10-23 21:57:08 (GMT+8)
訂單狀態: 已確認
2023186837
產品編號：:

88124
產品名稱：:

小琉球船票｜屏東東港漁港 - 小琉球｜東琉線聯營處｜船票＆拼車接駁
方案名稱:

屏東｜小琉球船票｜東港-小琉球往返
成本價總額:

730.00 TWD
單位:

往返船票（東琉線聯營處） x 2
參加時間:

2023-11-18
憑證類型:

KLOOKCODE
訂單確認時效:

立即確認並發送憑證
確認時間:

2023-10-23 21:58:22
訂單來源:

Klook
全名:

chu hungchi
電子信箱:

acerchu@gmail.com
手機號碼:

886-925938709
`

const childInput = `
訂單編號: UBN043756
預訂時間: 2023-10-23 21:37:13 (GMT+8)
訂單狀態: 已確認
2023186835
產品編號：:

22886
產品名稱：:

小琉球船票｜屏東東港漁港 - 小琉球｜船票＆拼車接駁
方案名稱:

往返船票 · 不含接駁 · 無機車租借 · 東琉聯營處（保證新船）
成本價總額:

400.00 TWD
單位:

半票 x 2
參加時間:

2023-11-18
憑證類型:

KLOOKCODE
訂單確認時效:

立即確認並發送憑證
確認時間:

2023-10-23 21:37:32
訂單來源:

Klook
全名:

朱 鴻基
電子信箱:

acerchu@gmail.com
手機號碼:

886-925938709
姓名:

朱鴻基
`


describe('轉換輸入文字函式', () => {
  it('【成功】轉換全票訂單訊息－全票', () => {
    const result = convertText(adultInput);
    expect(result).toEqual({
      departureDate: '2023-11-04',
      passengerName: '劉 建軍',
      adultCount: 6,
      childCount: 0,
      passengerPhone: '886-0930101253',
      orderNumber: 'NUQ576054'
    });
  });

  it('【成功】轉換全票訂單訊息－往返船票', () => {
    const result = convertText(adultRoundTripInput);
    expect(result).toEqual({
      departureDate: '2023-11-18',
      passengerName: 'chu hungchi',
      adultCount: 2,
      childCount: 0,
      passengerPhone: '886-925938709',
      orderNumber: 'FKH699004'
    });
  });

  it('【成功】轉換半票訂單訊息', () => {
    const result = convertText(childInput);
    expect(result).toEqual({
      departureDate: '2023-11-18',
      passengerName: '朱 鴻基',
      adultCount: 0,
      childCount: 2,
      passengerPhone: '886-925938709',
      orderNumber: 'UBN043756'
    });
  });

  it('【失敗】轉換訂單訊息', () => {
    const incorrectInput = '這是一個不正確的輸入';
    const result = convertText(incorrectInput);
    expect(result).toEqual({
      departureDate: '',
      passengerName: '',
      adultCount: 0,
      childCount: 0,
      passengerPhone: '',
      orderNumber: ''
    });
  });
});

