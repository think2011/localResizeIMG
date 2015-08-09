function JPEGEncoder (l) {
    var o = this;
    var s = Math.round;
    var k = Math.floor;
    var O = new Array(64);
    var K = new Array(64);
    var d = new Array(64);
    var Z = new Array(64);
    var u;
    var h;
    var G;
    var T;
    var n = new Array(65535);
    var m = new Array(65535);
    var P = new Array(64);
    var S = new Array(64);
    var j = [];
    var t = 0;
    var a = 7;
    var A = new Array(64);
    var f = new Array(64);
    var U = new Array(64);
    var e = new Array(256);
    var C = new Array(2048);
    var x;
    var i = [0, 1, 5, 6, 14, 15, 27, 28, 2, 4, 7, 13, 16, 26, 29, 42, 3, 8, 12, 17, 25, 30, 41, 43, 9, 11, 18, 24, 31, 40, 44, 53, 10, 19, 23, 32, 39, 45, 52, 54, 20, 22, 33, 38, 46, 51, 55, 60, 21, 34, 37, 47, 50, 56, 59, 61, 35, 36, 48, 49, 57, 58, 62, 63];
    var g = [0, 0, 1, 5, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0];
    var c = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    var w = [0, 0, 2, 1, 3, 3, 2, 4, 3, 5, 5, 4, 4, 0, 0, 1, 125];
    var E = [1, 2, 3, 0, 4, 17, 5, 18, 33, 49, 65, 6, 19, 81, 97, 7, 34, 113, 20, 50, 129, 145, 161, 8, 35, 66, 177, 193, 21, 82, 209, 240, 36, 51, 98, 114, 130, 9, 10, 22, 23, 24, 25, 26, 37, 38, 39, 40, 41, 42, 52, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122, 131, 132, 133, 134, 135, 136, 137, 138, 146, 147, 148, 149, 150, 151, 152, 153, 154, 162, 163, 164, 165, 166, 167, 168, 169, 170, 178, 179, 180, 181, 182, 183, 184, 185, 186, 194, 195, 196, 197, 198, 199, 200, 201, 202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250];
    var v = [0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0];
    var Y = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    var J = [0, 0, 2, 1, 2, 4, 4, 3, 4, 7, 5, 4, 4, 0, 1, 2, 119];
    var B = [0, 1, 2, 3, 17, 4, 5, 33, 49, 6, 18, 65, 81, 7, 97, 113, 19, 34, 50, 129, 8, 20, 66, 145, 161, 177, 193, 9, 35, 51, 82, 240, 21, 98, 114, 209, 10, 22, 36, 52, 225, 37, 241, 23, 24, 25, 26, 38, 39, 40, 41, 42, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122, 130, 131, 132, 133, 134, 135, 136, 137, 138, 146, 147, 148, 149, 150, 151, 152, 153, 154, 162, 163, 164, 165, 166, 167, 168, 169, 170, 178, 179, 180, 181, 182, 183, 184, 185, 186, 194, 195, 196, 197, 198, 199, 200, 201, 202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 226, 227, 228, 229, 230, 231, 232, 233, 234, 242, 243, 244, 245, 246, 247, 248, 249, 250];

    function M (ag) {
        var af = [16, 11, 10, 16, 24, 40, 51, 61, 12, 12, 14, 19, 26, 58, 60, 55, 14, 13, 16, 24, 40, 57, 69, 56, 14, 17, 22, 29, 51, 87, 80, 62, 18, 22, 37, 56, 68, 109, 103, 77, 24, 35, 55, 64, 81, 104, 113, 92, 49, 64, 78, 87, 103, 121, 120, 101, 72, 92, 95, 98, 112, 100, 103, 99];
        for (var ae = 0; ae < 64; ae++) {
            var aj = k((af[ae] * ag + 50) / 100);
            if (aj < 1) {
                aj = 1
            } else {
                if (aj > 255) {
                    aj = 255
                }
            }
            O[i[ae]] = aj
        }
        var ah = [17, 18, 24, 47, 99, 99, 99, 99, 18, 21, 26, 66, 99, 99, 99, 99, 24, 26, 56, 99, 99, 99, 99, 99, 47, 66, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99];
        for (var ad = 0; ad < 64; ad++) {
            var ai = k((ah[ad] * ag + 50) / 100);
            if (ai < 1) {
                ai = 1
            } else {
                if (ai > 255) {
                    ai = 255
                }
            }
            K[i[ad]] = ai
        }
        var ac = [1, 1.387039845, 1.306562965, 1.175875602, 1, 0.785694958, 0.5411961, 0.275899379];
        var ab = 0;
        for (var ak = 0; ak < 8; ak++) {
            for (var aa = 0; aa < 8; aa++) {
                d[ab] = (1 / (O[i[ab]] * ac[ak] * ac[aa] * 8));
                Z[ab] = (1 / (K[i[ab]] * ac[ak] * ac[aa] * 8));
                ab++
            }
        }
    }

    function q (ae, aa) {
        var ad = 0;
        var ag = 0;
        var af = new Array();
        for (var ab = 1; ab <= 16; ab++) {
            for (var ac = 1; ac <= ae[ab]; ac++) {
                af[aa[ag]]    = [];
                af[aa[ag]][0] = ad;
                af[aa[ag]][1] = ab;
                ag++;
                ad++
            }
            ad *= 2
        }
        return af
    }

    function W () {
        u = q(g, c);
        h = q(v, Y);
        G = q(w, E);
        T = q(J, B)
    }

    function z () {
        var ac = 1;
        var ab = 2;
        for (var aa = 1; aa <= 15; aa++) {
            for (var ad = ac; ad < ab; ad++) {
                m[32767 + ad]    = aa;
                n[32767 + ad]    = [];
                n[32767 + ad][1] = aa;
                n[32767 + ad][0] = ad
            }
            for (var ae = -(ab - 1); ae <= -ac; ae++) {
                m[32767 + ae]    = aa;
                n[32767 + ae]    = [];
                n[32767 + ae][1] = aa;
                n[32767 + ae][0] = ab - 1 + ae
            }
            ac <<= 1;
            ab <<= 1
        }
    }

    function V () {
        for (var aa = 0; aa < 256; aa++) {
            C[aa]               = 19595 * aa;
            C[(aa + 256) >> 0]  = 38470 * aa;
            C[(aa + 512) >> 0]  = 7471 * aa + 32768;
            C[(aa + 768) >> 0]  = -11059 * aa;
            C[(aa + 1024) >> 0] = -21709 * aa;
            C[(aa + 1280) >> 0] = 32768 * aa + 8421375;
            C[(aa + 1536) >> 0] = -27439 * aa;
            C[(aa + 1792) >> 0] = -5329 * aa
        }
    }

    function X (aa) {
        var ac = aa[0];
        var ab = aa[1] - 1;
        while (ab >= 0) {
            if (ac & (1 << ab)) {
                t |= (1 << a)
            }
            ab--;
            a--;
            if (a < 0) {
                if (t == 255) {
                    F(255);
                    F(0)
                } else {
                    F(t)
                }
                a = 7;
                t = 0
            }
        }
    }

    function F (aa) {
        j.push(e[aa])
    }

    function p (aa) {
        F((aa >> 8) & 255);
        F((aa) & 255)
    }

    function N (aZ, ap) {
        var aL, aK, aJ, aI, aH, aD, aC, aB;
        var aN   = 0;
        var aR;
        const aq = 8;
        const ai = 64;
        for (aR = 0; aR < aq; ++aR) {
            aL         = aZ[aN];
            aK         = aZ[aN + 1];
            aJ         = aZ[aN + 2];
            aI         = aZ[aN + 3];
            aH         = aZ[aN + 4];
            aD         = aZ[aN + 5];
            aC         = aZ[aN + 6];
            aB         = aZ[aN + 7];
            var aY     = aL + aB;
            var aO     = aL - aB;
            var aX     = aK + aC;
            var aP     = aK - aC;
            var aU     = aJ + aD;
            var aQ     = aJ - aD;
            var aT     = aI + aH;
            var aS     = aI - aH;
            var an     = aY + aT;
            var ak     = aY - aT;
            var am     = aX + aU;
            var al     = aX - aU;
            aZ[aN]     = an + am;
            aZ[aN + 4] = an - am;
            var ax     = (al + ak) * 0.707106781;
            aZ[aN + 2] = ak + ax;
            aZ[aN + 6] = ak - ax;
            an         = aS + aQ;
            am         = aQ + aP;
            al         = aP + aO;
            var at     = (an - al) * 0.382683433;
            var aw     = 0.5411961 * an + at;
            var au     = 1.306562965 * al + at;
            var av     = am * 0.707106781;
            var ah     = aO + av;
            var ag     = aO - av;
            aZ[aN + 5] = ag + aw;
            aZ[aN + 3] = ag - aw;
            aZ[aN + 1] = ah + au;
            aZ[aN + 7] = ah - au;
            aN += 8
        }
        aN = 0;
        for (aR = 0; aR < aq; ++aR) {
            aL          = aZ[aN];
            aK          = aZ[aN + 8];
            aJ          = aZ[aN + 16];
            aI          = aZ[aN + 24];
            aH          = aZ[aN + 32];
            aD          = aZ[aN + 40];
            aC          = aZ[aN + 48];
            aB          = aZ[aN + 56];
            var ar      = aL + aB;
            var aj      = aL - aB;
            var az      = aK + aC;
            var ae      = aK - aC;
            var aG      = aJ + aD;
            var ac      = aJ - aD;
            var aW      = aI + aH;
            var aa      = aI - aH;
            var ao      = ar + aW;
            var aV      = ar - aW;
            var ay      = az + aG;
            var aF      = az - aG;
            aZ[aN]      = ao + ay;
            aZ[aN + 32] = ao - ay;
            var af      = (aF + aV) * 0.707106781;
            aZ[aN + 16] = aV + af;
            aZ[aN + 48] = aV - af;
            ao          = aa + ac;
            ay          = ac + ae;
            aF          = ae + aj;
            var aM      = (ao - aF) * 0.382683433;
            var ad      = 0.5411961 * ao + aM;
            var a1      = 1.306562965 * aF + aM;
            var ab      = ay * 0.707106781;
            var a0      = aj + ab;
            var aA      = aj - ab;
            aZ[aN + 40] = aA + ad;
            aZ[aN + 24] = aA - ad;
            aZ[aN + 8]  = a0 + a1;
            aZ[aN + 56] = a0 - a1;
            aN++
        }
        var aE;
        for (aR = 0; aR < ai; ++aR) {
            aE    = aZ[aR] * ap[aR];
            P[aR] = (aE > 0) ? ((aE + 0.5) | 0) : ((aE - 0.5) | 0)
        }
        return P
    }

    function b () {
        p(65504);
        p(16);
        F(74);
        F(70);
        F(73);
        F(70);
        F(0);
        F(1);
        F(1);
        F(0);
        p(1);
        p(1);
        F(0);
        F(0)
    }

    function r (aa, ab) {
        p(65472);
        p(17);
        F(8);
        p(ab);
        p(aa);
        F(3);
        F(1);
        F(17);
        F(0);
        F(2);
        F(17);
        F(1);
        F(3);
        F(17);
        F(1)
    }

    function D () {
        p(65499);
        p(132);
        F(0);
        for (var ab = 0; ab < 64; ab++) {
            F(O[ab])
        }
        F(1);
        for (var aa = 0; aa < 64; aa++) {
            F(K[aa])
        }
    }

    function H () {
        p(65476);
        p(418);
        F(0);
        for (var ae = 0; ae < 16; ae++) {
            F(g[ae + 1])
        }
        for (var ad = 0; ad <= 11; ad++) {
            F(c[ad])
        }
        F(16);
        for (var ac = 0; ac < 16; ac++) {
            F(w[ac + 1])
        }
        for (var ab = 0; ab <= 161; ab++) {
            F(E[ab])
        }
        F(1);
        for (var aa = 0; aa < 16; aa++) {
            F(v[aa + 1])
        }
        for (var ah = 0; ah <= 11; ah++) {
            F(Y[ah])
        }
        F(17);
        for (var ag = 0; ag < 16; ag++) {
            F(J[ag + 1])
        }
        for (var af = 0; af <= 161; af++) {
            F(B[af])
        }
    }

    function I () {
        p(65498);
        p(12);
        F(3);
        F(1);
        F(0);
        F(2);
        F(17);
        F(3);
        F(17);
        F(0);
        F(63);
        F(0)
    }

    function L (ad, aa, al, at, ap) {
        var ag   = ap[0];
        var ab   = ap[240];
        var ac;
        const ar = 16;
        const ai = 63;
        const ah = 64;
        var aq   = N(ad, aa);
        for (var am = 0; am < ah; ++am) {
            S[i[am]] = aq[am]
        }
        var an = S[0] - al;
        al     = S[0];
        if (an == 0) {
            X(at[0])
        } else {
            ac = 32767 + an;
            X(at[m[ac]]);
            X(n[ac])
        }
        var ae = 63;
        for (; (ae > 0) && (S[ae] == 0); ae--) {
        }
        if (ae == 0) {
            X(ag);
            return al
        }
        var ao = 1;
        var au;
        while (ao <= ae) {
            var ak = ao;
            for (; (S[ao] == 0) && (ao <= ae); ++ao) {
            }
            var aj = ao - ak;
            if (aj >= ar) {
                au = aj >> 4;
                for (var af = 1; af <= au; ++af) {
                    X(ab)
                }
                aj = aj & 15
            }
            ac = 32767 + S[ao];
            X(ap[(aj << 4) + m[ac]]);
            X(n[ac]);
            ao++
        }
        if (ae != ai) {
            X(ag)
        }
        return al
    }

    function y () {
        var ab = String.fromCharCode;
        for (var aa = 0; aa < 256; aa++) {
            e[aa] = ab(aa)
        }
    }

    this.encode = function (an, aj, aB) {
        var aa = new Date().getTime();
        if (aj) {
            R(aj)
        }
        j                       = new Array();
        t                       = 0;
        a                       = 7;
        p(65496);
        b();
        D();
        r(an.width, an.height);
        H();
        I();
        var al                  = 0;
        var aq                  = 0;
        var ao                  = 0;
        t                       = 0;
        a                       = 7;
        this.encode.displayName = "_encode_";
        var at                  = an.data;
        var ar                  = an.width;
        var aA                  = an.height;
        var ay                  = ar * 4;
        var ai                  = ar * 3;
        var ah, ag              = 0;
        var am, ax, az;
        var ab, ap, ac, af, ae;
        while (ag < aA) {
            ah = 0;
            while (ah < ay) {
                ab = ay * ag + ah;
                ap = ab;
                ac = -1;
                af = 0;
                for (ae = 0; ae < 64; ae++) {
                    af = ae >> 3;
                    ac = (ae & 7) * 4;
                    ap = ab + (af * ay) + ac;
                    if (ag + af >= aA) {
                        ap -= (ay * (ag + 1 + af - aA))
                    }
                    if (ah + ac >= ay) {
                        ap -= ((ah + ac) - ay + 4)
                    }
                    am    = at[ap++];
                    ax    = at[ap++];
                    az    = at[ap++];
                    A[ae] = ((C[am] + C[(ax + 256) >> 0] + C[(az + 512) >> 0]) >> 16) - 128;
                    f[ae] = ((C[(am + 768) >> 0] + C[(ax + 1024) >> 0] + C[(az + 1280) >> 0]) >> 16) - 128;
                    U[ae] = ((C[(am + 1280) >> 0] + C[(ax + 1536) >> 0] + C[(az + 1792) >> 0]) >> 16) - 128
                }
                al = L(A, d, al, u, G);
                aq = L(f, Z, aq, h, T);
                ao = L(U, Z, ao, h, T);
                ah += 32
            }
            ag += 8
        }
        if (a >= 0) {
            var aw = [];
            aw[1]  = a + 1;
            aw[0]  = (1 << (a + 1)) - 1;
            X(aw)
        }
        p(65497);
        if (aB) {
            var av = j.length;
            var aC = new Uint8Array(av);
            for (var au = 0; au < av; au++) {
                aC[au] = j[au].charCodeAt()
            }
            j      = [];
            var ak = new Date().getTime() - aa;
            return aC
        }
        var ad = "data:image/jpeg;base64," + btoa(j.join(""));
        j      = [];
        var ak = new Date().getTime() - aa;
        return ad
    };
    function R (ab) {
        if (ab <= 0) {
            ab = 1
        }
        if (ab > 100) {
            ab = 100
        }
        if (x == ab) {
            return
        }
        var aa = 0;
        if (ab < 50) {
            aa = Math.floor(5000 / ab)
        } else {
            aa = Math.floor(200 - ab * 2)
        }
        M(aa);
        x      = ab;
    }

    function Q () {
        var aa = new Date().getTime();
        if (!l) {
            l = 50
        }
        y();
        W();
        z();
        V();
        R(l);
        var ab = new Date().getTime() - aa;
    }

    Q()
}

module.exports = JPEGEncoder;