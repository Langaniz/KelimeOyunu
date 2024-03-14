const tümSorular = [
    {
        Kelime : "IŞIK",
        Soru : "Aydınlanmayı veya bilgiyi simgeler",
        Puan : "200"
    },
    {
        Kelime : "DUYU",
        Soru : "Bir organizmanın çevresinden gelen dış uyaranları algılama yeteneğini ifade eder",
        Puan : "200"
    },
    {
        Kelime : "SANAT",
        Soru : "İnsanların duygularını, düşüncelerini ve hayal güçlerini ifade etmek için çeşitli yollar kullanarak yarattıkları yaratıcı bir faaliyettir",
        Puan : "300"
    },
    {
        Kelime : "SOMUT",
        Soru : "Fiziksel olarak algılanabilir",
        Puan : "300"
    },
    {
        Kelime : "BOYLAM",
        Soru : "Coğrafi bir terim olup, Dünya'nın yüzeyindeki bir noktanın, başlangıç meridyeninden olan açısal uzaklığını ifade eder",
        Puan : "400"
    },
    {
        Kelime : "VERMEK",
        Soru : "Bir şeyi başka birine veya bir şeye sahip olması için aktarmak veya iletmek",
        Puan : "400"
    },
    {
        Kelime : "GIRTLAK",
        Soru : "Solunum ve sindirim sistemlerinin kesiştiği noktada bulunan bir organ",
        Puan : "500"
    },
    {
        Kelime : "ÇIKINTI",
        Soru : "Yükselen veya kabartılan bir nesne veya bölge",
        Puan : "500"
    },
    {
        Kelime : "MÜZAYEDE",
        Soru : "Belirli bir mal veya hizmetin alıcıları arasında rekabetçi tekliflerle satışının gerçekleştirildiği bir tür açık pazar",
        Puan : "600"
    },
    {
        Kelime : "İLLÜZYON",
        Soru : "Algıda yanılsama yaratan, gerçeklikten farklı bir izlenim oluşturan bir görsel veya zihinsel fenomen",
        Puan : "600"
    },
    {
        Kelime : "KANDIRMAK",
        Soru : "Birini yanıltmak, aldatmak veya yanlış yönlendirmek",
        Puan : "700"
    },
    {
        Kelime : "SALDIRMAK",
        Soru : "Agresif bir şekilde bir başka kişiye veya bir şeye fiziksel olarak zarar vermek",
        Puan : "700"
    },
    {
        Kelime : "ÜNİVERSİTE",
        Soru : "Genellikle lisans ve lisansüstü eğitim veren bir akademik kurum",
        Puan : "800"
    },
    {
        Kelime : "SATINALMAK",
        Soru : "Bir mal veya hizmeti belirli bir bedel karşılığında edinmek",
        Puan : "800"
    },
    {
        Kelime : "GERÇEKANLAM",
        Soru : "Nesnel, doğru ve objektif olarak kabul edilen anlam",
        Puan : "900"
    },
    {
        Kelime : "LABORATUVAR",
        Soru : "Bilimsel araştırma ve deneylerin gerçekleştirildiği, ölçüm ve analizlerin yapıldığı, bilimsel keşiflerin ve bulguların test edildiği ve doğrulandığı bir ortam",
        Puan : "900"
    },
    {
        Kelime: "TELEVİZYONCU",
        Soru: "Televizyon programlarının yapım, sunum veya yayın yönetimiyle ilgilenen kişi",
        Puan : "1000"
    }
];



let kelimeIndex = 0;
let kelimeGosterici = document.getElementById("kelimeGosterici");
let sonucGonderBtn = document.getElementById("sonucGonder");
let soruGosterici = document.getElementById("soruGosterici");
let tahminInput = document.getElementById("tahminInput");
let güncelPuan = document.querySelector(".güncelPuan");
let soruPuan = document.querySelector(".soruPuan");
let letters;

function sonrakiKelimeGoster() {
    if (kelimeIndex < tümSorular.length) {
        let kelime = tümSorular[kelimeIndex].Kelime;
        let soru = tümSorular[kelimeIndex].Soru;
        let puan = tümSorular[kelimeIndex].Puan;

        kelimeGosterici.innerHTML = '';
        soruGosterici.innerHTML = '';

        letters = [];

        for (let i = 0; i < kelime.length; i++) {
            let harfDiv = document.createElement('div');
            harfDiv.classList.add('letters');
            kelimeGosterici.appendChild(harfDiv);
            letters.push(harfDiv);
        }

        let soruDiv = document.createElement('div');
        soruDiv.textContent = soru;
        soruGosterici.appendChild(soruDiv);

        soruPuan.textContent = puan;

        kelimeIndex++;
    } else {
        kelimeGosterici.textContent = "Oyun bitti!";
        soruGosterici.textContent = "";
        sonucGonderBtn.disabled = true;
    }
}

function güncelPuanGöster(puan) {
    güncelPuan.textContent = puan;
}

function harfAl() {
    let puan = parseInt(güncelPuan.textContent);
    if (puan >= 100) {
        let randomIndex = Math.floor(Math.random() * letters.length);
        while (letters[randomIndex].textContent != '') {
            randomIndex = Math.floor(Math.random() * letters.length);
        }
        letters[randomIndex].textContent = tümSorular[kelimeIndex - 1].Kelime[randomIndex];
        güncelPuanGöster(puan - 100);
    } else {
        alert("Yeterli puanınız yok!");
    }
}

function sonucGonder() {
    let tahmin = tahminInput.value.toUpperCase();

    if (tahmin == tümSorular[kelimeIndex - 1].Kelime) {
        alert("Tebrikler, doğru tahmin ettiniz!");
        letters.forEach(letter => letter.textContent = letter.textContent + " (" + tahmin + ")");
        güncelPuanGöster(parseInt(güncelPuan.textContent) + parseInt(tümSorular[kelimeIndex - 1].Puan));
        sonrakiKelimeGoster();
        tahminInput.value = "";
    } else {
        alert("Üzgünüz, yanlış tahmin. Lütfen tekrar deneyin.");
        tahminInput.value = "";
    }
}

sonucGonderBtn.addEventListener("click", sonucGonder);
document.getElementById("harfAl").addEventListener("click", harfAl);

sonrakiKelimeGoster();
güncelPuanGöster(0);
