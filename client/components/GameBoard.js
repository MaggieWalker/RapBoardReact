import React from 'react'
import Navbar from './navbar'
import CorrectScreen from './CorrectScreen'


class GameBoard extends React.Component{
  constructor() {
    super()
    this.rappers = [
        {"name":"twochainz","artist":"2 chainz","track":"http://www.therapboard.com/audio/2chainz_yeah2.ogg","img":"http://therapboard.com/images/artist/2chainz.png"},
        {"name":"tupac","artist":"2pac","track":"http://www.therapboard.com/audio/2pac_4.ogg","img":"http://therapboard.com/images/artist/2pac.png"},
        {"name":"fiftycent","artist":"50 Cent","track":"http://www.therapboard.com/audio/50_5.ogg","img":"http://therapboard.com/images/artist/fiftycent.png"},
        {"name":"actionbronson","artist":"Action Bronson","track":"http://www.therapboard.com/audio/action_bronsolino.ogg","img":"http://therapboard.com/images/artist/actionbronson.png"},
        {"name":"akon","artist":"Akon","track":"http://www.therapboard.com/audio/akon_1.ogg","img":"http://therapboard.com/images/artist/akon.png"},
        {"name":"bigboi","artist":"Big Boi","track":"http://www.therapboard.com/audio/bigboi_1.ogg","img":"http://therapboard.com/images/artists/bigboi.png"},
        {"name":"bigsean1","artist":"Big Sean","track":"http://www.therapboard.com/audio/bigsean_boi2.ogg","img":"http://therapboard.com/images/artist/bigsean.png"},
        {"name":"bigsean2","artist":"Big Sean","track":"http://www.therapboard.com/audio/bigsean_holdup2.ogg","img":"http://therapboard.com/images/artist/bigsean.png"},
        {"name":"bigsean3","artist":"Big Sean","track":"http://www.therapboard.com/audio/bigsean_ohgod.ogg","img":"http://therapboard.com/images/artist/bigsean.png"},
        {"name":"birdman1","artist":"Birdman","track":"http://www.therapboard.com/audio/birdman_4.ogg","img":"http://therapboard.com/images/artist/birdman.png"},
        {"name":"birdman2","artist":"Birdman","track":"http://www.therapboard.com/audio/birdman_10.ogg","img":"http://therapboard.com/images/artist/birdman.png"},
        {"name":"bobbyshmurda","artist":"Bobby Shmurda","track":"http://www.therapboard.com/audio/bobby_hahaha.ogg","img":"http://therapboard.com/images/artist/bobby.png"},
        {"name":"bowwow","artist":"Bow Wow","track":"http://www.therapboard.com/audio/bowwow_yeah.ogg","img":"http://therapboard.com/images/artist/bowwow.png"},
        {"name":"bunb","artist":"Bun B","track":"http://www.therapboard.com/audio/bunb_ugk4life.ogg","img":"http://therapboard.com/images/artist/bunb.png"},
        {"name":"busta","artist":"Busta Rhymes","track":"http://www.therapboard.com/audio/busta_6.ogg","img":"http://therapboard.com/images/artist/busta.png"},
        {"name":"camron","artist":"Cam'Ron","track":"http://www.therapboard.com/audio/camron_1.ogg","img":"http://therapboard.com/images/artist/camron.png"},
        {"name":"chance","artist":"Chance The Rapper","track":"http://www.therapboard.com/audio/chance_aghh2.ogg","img":"http://therapboard.com/images/artist/chance.png"},
        {"name":"chingy","artist":"Chingy","track":"http://www.therapboard.com/audio/chingy_1.ogg","img":"http://therapboard.com/images/artists/chingy.png"},
        {"name":"currensy","artist":"Curren$y","track":"http://www.therapboard.com/audio/currensy_1.ogg","img":"http://therapboard.com/images/artists/currensy.png"},
        {"name":"dabrat1","artist":"Da Brat","track":"http://www.therapboard.com/audio/dabrat_comeon.ogg","img":"http://therapboard.com/images/artists/dabrat.png"},
        {"name":"dabrat2","artist":"Da Brat","track":"http://www.therapboard.com/audio/dabrat_lookout.ogg","img":"http://therapboard.com/images/artists/dabrat.png"},
        {"name":"dabrat3","artist":"Da Brat","track":"http://www.therapboard.com/audio/dabrat_oh.ogg","img":"http://therapboard.com/images/artists/dabrat.png"},
        {"name":"dannybrown","artist":"Danny Brown","track":"http://www.therapboard.com/audio/danny_stop.ogg", "img": "http://therapboard.com/images/artist/dannybrown.png"},
        {"name":"davidbanner","artist":"David Banner","track":"http://www.therapboard.com/audio/davidbanner_5.ogg","img":"http://therapboard.com/images/artists/davidbanner.png"},
        {"name":"diddy","artist":"Diddy","track":"http://www.therapboard.com/audio/diddy_1.ogg", "img": "http://therapboard.com/images/artists/diddy.png"},
        {"name":"dizzee","artist":"Dizzee Rascal","track":"http://www.therapboard.com/audio/dizzee_1.ogg","img":"http://therapboard.com/images/artists/dizzee.png"},
        {"name":"khaled1","artist":"DJ Khaled","track":"http://www.therapboard.com/audio/djkhaled_2.ogg","img":"http://therapboard.com/images/artists/khaled.png"},
        {"name":"khaled2","artist":"DJ Khaled","track":"http://www.therapboard.com/audio/djkhaled_3.ogg","img":"http://therapboard.com/images/artists/khaled.png"},
        {"name":"djpaul1","artist":"DJ Paul","track":"http://www.therapboard.com/audio/djpaul_2.ogg","img":"http://therapboard.com/images/artists/djpaul.png"},
        {"name":"djpaul2","artist":"DJ Paul","track":"http://www.therapboard.com/audio/djpaul_3.ogg","img":"http://therapboard.com/images/artists/djpaul.png"},
        {"name":"djpaul3","artist":"DJ Paul","track":"http://www.therapboard.com/audio/djpaul_9.ogg","img":"http://therapboard.com/images/artists/djpaul.png"},
        {"name":"dmx1","artist":"DMX","track":"http://www.therapboard.com/audio/dmx_1.ogg","img":"http://therapboard.com/images/artists/dmx.png"},
        {"name":"dmx2","artist":"DMX","track":"http://www.therapboard.com/audio/dmx_3.ogg","img":"http://therapboard.com/images/artists/dmx.png"},
        {"name":"dmx3","artist":"DMX","track":"http://www.therapboard.com/audio/dmx_6.ogg","img":"http://therapboard.com/images/artists/dmx.png"},
        {"name":"dmx4","artist":"DMX","track":"http://www.therapboard.com/audio/dmx_7.ogg","img":"http://therapboard.com/images/artists/dmx.png"},
        {"name":"drake1","artist":"Drake","track":"http://www.therapboard.com/audio/drake_2.ogg","img":"http://therapboard.com/images/artist/drake.png"},
        {"name":"drake2","artist":"Drake","track":"http://www.therapboard.com/audio/drake_3.ogg","img":"http://therapboard.com/images/artist/drake.png"},
        {"name":"drake3","artist":"Drake","track":"http://www.therapboard.com/audio/drake_4.ogg","img":"http://therapboard.com/images/artist/drake.png"},
        {"name":"drake4","artist":"Drake","track":"http://www.therapboard.com/audio/drake_5.ogg","img":"http://therapboard.com/images/artist/drake.png"},
        {"name":"drummaboy","artist":"Drumma Boy","track":"http://www.therapboard.com/audio/drummaboy_1.ogg","img":"http://therapboard.com/images/artist/drummaboy.png"},
        {"name":"e401","artist":"E-40","track":"http://www.therapboard.com/audio/e40_1.ogg","img":"http://therapboard.com/images/artist/e40.png"},
        {"name":"e402","artist":"E-40","track":"http://www.therapboard.com/audio/e40_2.ogg","img":"http://therapboard.com/images/artist/e40.png"},
        {"name":"eazye","artist":"Eazy-E","track":"http://www.therapboard.com/audio/eazye_1.ogg","img":"http://therapboard.com/images/artists/eazye.png"},
        {"name":"eminem1","artist":"Eminem","track":"http://www.therapboard.com/audio/eminem_3.ogg","img":"http://therapboard.com/images/artist/eminem.png"},
        {"name":"eminem2","artist":"Eminem","track":"http://www.therapboard.com/audio/eminem_4.ogg","img":"http://therapboard.com/images/artist/eminem.png"},
        {"name":"fatjoe1","artist":"Fat Joe","track":"http://www.therapboard.com/audio/fatjoe_1.ogg","img":"http://therapboard.com/images/artist/fatjoe.png"},
        {"name":"fatjoe2","artist":"Fat Joe","track":"http://www.therapboard.com/audio/fatjoe_9.ogg","img":"http://therapboard.com/images/artist/fatjoe.png"},
        {"name":"fatjoe3","artist":"Fat Joe","track":"http://www.therapboard.com/audio/fatjoe_5.ogg","img":"http://therapboard.com/images/artist/fatjoe.png"},
        {"name":"flava","artist":"Flavor Flav","track":"http://www.therapboard.com/audio/flava_1.ogg","img":"http://therapboard.com/images/artist/flava.png"},
        {"name":"freeway","artist":"Freeway","track":"http://www.therapboard.com/audio/freeway_1.ogg","img":"http://therapboard.com/images/artist/freeway.png"},
        {"name":"frenchie","artist":"French Montana","track":"http://www.therapboard.com/audio/french_1.ogg","img":"http://therapboard.com/images/artist/frenchie.png"},
        {"name":"ghostface","artist":"Ghostface Killah","track":"http://www.therapboard.com/audio/ghostface_yo.ogg","img":"http://therapboard.com/images/artist/ghostface.png"},
        {"name":"grandmaster","artist":"Grandmaster Flash","track":"http://www.therapboard.com/audio/grandmaster_1.ogg","img":"http://therapboard.com/images/artist/grandmaster.png"},
        {"name":"gucci1","artist":"Gucci Mane","track":"http://www.therapboard.com/audio/gucci_1.ogg","img":"http://therapboard.com/images/artist/gucci.png"},
        {"name":"gucci2","artist":"Gucci Mane","track":"http://www.therapboard.com/audio/gucci_4.ogg","img":"http://therapboard.com/images/artist/gucci.png"},
        {"name":"gucci3","artist":"Gucci Mane","track":"http://www.therapboard.com/audio/gucci_14.ogg","img":"http://therapboard.com/images/artist/gucci.png"},
        {"name":"gucci4","artist":"Gucci Mane","track":"http://www.therapboard.com/audio/gucci_8.ogg","img":"http://therapboard.com/images/artist/gucci.png"},
        {"name":"gucci5","artist":"Gucci Mane","track":"http://www.therapboard.com/audio/gucci_9.ogg","img":"http://therapboard.com/images/artist/gucci.png"},
        {"name":"hurricane","artist":"Hurricane Chris","track":"http://www.therapboard.com/audio/hurricanechris_1.ogg","img":"http://therapboard.com/images/artist/hurricane.png"},
        {"name":"icecube","artist":"Ice Cube","track":"http://www.therapboard.com/audio/icecube_1.ogg","img":"http://therapboard.com/images/artist/icecube.png"},
        {"name":"inspectahdeck","artist":"Inspectah Deck","track":"http://www.therapboard.com/audio/inspectahdeck_killahill.ogg","img":"http://therapboard.com/images/artist/inspectahdeck.png"},
        {"name":"jadakiss","artist":"Jadakiss","track":"http://www.therapboard.com/audio/jadakiss_3.ogg","img":"http://therapboard.com/images/artist/jadakiss.png"},
        {"name":"jarule1","artist":"Ja Rule","track":"http://www.therapboard.com/audio/jarule_1.ogg","img":"http://therapboard.com/images/artist/jarule.png"},
        {"name":"jarule2","artist":"Ja Rule","track":"http://www.therapboard.com/audio/jarule_2.ogg","img":"http://therapboard.com/images/artist/jarule.png"},
        {"name":"jayz1","artist":"Jay-Z","track":"http://www.therapboard.com/audio/jayz_7.ogg","img":"http://therapboard.com/images/artist/jayz.png"},
        {"name":"jayz2","artist":"Jay-Z","track":"http://www.therapboard.com/audio/jayz_9.ogg","img":"http://therapboard.com/images/artist/jayz.png"},
        {"name":"jayz3","artist":"Jay-Z","track":"http://www.therapboard.com/audio/jayz_1.ogg","img":"http://therapboard.com/images/artist/jayz.png"},
        {"name":"jayz4","artist":"Jay-Z","track":"http://www.therapboard.com/audio/jayz5.ogg","img":"http://therapboard.com/images/artist/jayz.png"},
        {"name":"jayz5","artist":"Jay-Z","track":"http://www.therapboard.com/audio/jayz7.ogg","img":"http://therapboard.com/images/artist/jayz.png"},
        {"name":"jayz6","artist":"Jay-Z","track":"http://www.therapboard.com/audio/jayz8.ogg","img":"http://therapboard.com/images/artist/jayz.png"},
        {"name":"jayz7","artist":"Jay-Z","track":"http://www.therapboard.com/audio/jayz_itsthero.ogg","img":"http://therapboard.com/images/artist/jayz.png"},
        {"name":"jayz8","artist":"Jay-Z","track":"http://www.therapboard.com/audio/jayz_itsyoboy.ogg","img":"http://therapboard.com/images/artist/jayz.png"},
        {"name":"jayz9","artist":"Jay-Z","track":"http://www.therapboard.com/audio/jayz_jiggaman.ogg","img":"http://therapboard.com/images/artist/jayz.png"},
        {"name":"jayz10","artist":"Jay-Z","track":"http://www.therapboard.com/audio/jayz_woo.ogg","img":"http://therapboard.com/images/artist/jayz.png"},
        {"name":"jayz11","artist":"Jay-Z","track":"http://www.therapboard.com/audio/jayz_yessir.ogg","img":"http://therapboard.com/images/artist/jayz.png"},
        {"name":"jayz12","artist":"Jay-Z","track":"http://www.therapboard.com/audio/jayz_young.ogg","img":"http://therapboard.com/images/artist/jayz.png"},
        {"name":"jd","artist":"Jermaine Dupri","track":"http://www.therapboard.com/audio/jermaine_unh.ogg","img":"http://therapboard.com/images/artist/jd.png"},
        {"name":"jimjones1","artist":"Jim Jones","track":"http://www.therapboard.com/audio/jones_8.ogg","img":"http://therapboard.com/images/artist/jimjones.png"},
        {"name":"jimjones2","artist":"Jim Jones","track":"http://www.therapboard.com/audio/jones_14.ogg","img":"http://therapboard.com/images/artist/jimjones.png"},
        {"name":"juelz","artist":"Juelz Santana","track":"http://www.therapboard.com/audio/juelz_2.ogg","img":"http://therapboard.com/images/artist/juelz.png"},
        {"name":"juicyj1","artist":"Juicy J","track":"http://www.therapboard.com/audio/juicyj_1.ogg","img":"http://therapboard.com/images/artist/juicyj.png"},
        {"name":"juicyj2","artist":"Juicy J","track":"http://www.therapboard.com/audio/juicyj_8.ogg","img":"http://therapboard.com/images/artist/juicyj.png"},
        {"name":"juicyj3","artist":"Juicy J","track":"http://www.therapboard.com/audio/juicyj_9.ogg","img":"http://therapboard.com/images/artist/juicyj.png"},
        {"name":"juicyj4","artist":"Juicy J","track":"http://www.therapboard.com/audio/juicyj_10.ogg","img":"http://therapboard.com/images/artist/juicyj.png"},
        {"name":"juicyj5","artist":"Juicy J","track":"http://www.therapboard.com/audio/juicyj_7.ogg","img":"http://therapboard.com/images/artist/juicyj.png"},
        {"name":"kanye","artist":"Kanye West","track":"http://www.therapboard.com/audio/kanye_1.ogg","img":"http://therapboard.com/images/artist/kanye.png"},
        {"name":"killermike1","artist":"Killer Mike","track":"http://www.therapboard.com/audio/killermike_2.ogg","img":"http://therapboard.com/images/artist/killermike.png"},
        {"name":"killermike2","artist":"Killer Mike","track":"http://www.therapboard.com/audio/killermike_3.ogg","img":"http://therapboard.com/images/artist/killermike.png"},
        {"name":"krsone","artist":"KRS One","track":"http://www.therapboard.com/audio/krsone_1.ogg","img":"http://therapboard.com/images/artist/krsone.png"},
        {"name":"lilb1","artist":"Lil B","track":"http://www.therapboard.com/audio/lilb_1.ogg","img":"http://therapboard.com/images/artist/lilb.png"},
        {"name":"lilb2","artist":"Lil B","track":"http://www.therapboard.com/audio/lilb_2.ogg","img":"http://therapboard.com/images/artist/lilb.png"},
        {"name":"liljon1","artist":"Lil Jon","track":"http://www.therapboard.com/audio/liljon_2.ogg","img":"http://therapboard.com/images/artist/liljon.png"},
        {"name":"liljon2","artist":"Lil Jon","track":"http://www.therapboard.com/audio/liljon_3.ogg","img":"http://therapboard.com/images/artist/liljon.png"},
        {"name":"weezy1","artist":"Lil Wayne","track":"http://www.therapboard.com/audio/weezy_22.ogg","img":"http://therapboard.com/images/artist/weezy.png"},
        {"name":"weezy2","artist":"Lil Wayne","track":"http://www.therapboard.com/audio/weezy_25.ogg","img":"http://therapboard.com/images/artist/weezy.png"},
        {"name":"weezy3","artist":"Lil Wayne","track":"http://www.therapboard.com/audio/weezy_31.ogg","img":"http://therapboard.com/images/artist/weezy.png"},
        {"name":"ludacris","artist":"Ludacris","track":"http://www.therapboard.com/audio/ludacris_2.ogg","img":"http://therapboard.com/images/artist/ludacris.png"},
        {"name":"mannie","artist":"Mannie Fresh","track":"http://www.therapboard.com/audio/mannie_2.ogg","img":"http://therapboard.com/images/artist/mannie.png"},
        {"name":"mchammer","artist":"MC Hammer","track":"http://www.therapboard.com/audio/mchammer_1.ogg","img":"http://therapboard.com/images/artist/mchammer.png"},
        {"name":"methodman","artist":"Method Man","track":"http://www.therapboard.com/audio/methodman_1.ogg","img":"http://therapboard.com/images/artist/methodman.png"},
        {"name":"mikejones","artist":"Mike Jones","track":"http://www.therapboard.com/audio/mikejones_2.ogg","img":"http://therapboard.com/images/artist/mikejones.png"},
        {"name":"nas","artist":"Nas","track":"http://www.therapboard.com/audio/nas_6.ogg","img":"http://therapboard.com/images/artist/nas.png"},
        {"name":"natedogg","artist":"Nate Dogg","track":"http://www.therapboard.com/audio/natedogg_1.ogg","img":"http://therapboard.com/images/artist/natedogg.png"},
        {"name":"nicki","artist":"Nicki Minaj","track":"http://www.therapboard.com/audio/nicki_youngmoney.ogg","img":"http://therapboard.com/images/artist/nicki.png"},
        {"name":"biggie","artist":"The Notorious B.I.G.","track":"http://www.therapboard.com/audio/biggie_2.ogg","img":"http://therapboard.com/images/artist/biggie.png"},
        {"name":"oj","artist":"OJ Da Juiceman","track":"http://www.therapboard.com/audio/oj_4.ogg","img":"http://therapboard.com/images/artist/oj.png"},
        {"name":"odb","artist":"Ol Dirty Bastard","track":"http://www.therapboard.com/audio/odb_shimmy.ogg","img":"http://therapboard.com/images/artist/odb.png"},
        {"name":"pharrell1","artist":"Pharrell","track":"http://www.therapboard.com/audio/pharrell_1.ogg","img":"http://therapboard.com/images/artist/pharrell.png"},
        {"name":"pharrell2","artist":"Pharrell","track":"http://www.therapboard.com/audio/pharrell_2.ogg","img":"http://therapboard.com/images/artist/pharrell.png"},
        {"name":"pimpc1","artist":"Pimp C","track":"http://www.therapboard.com/audio/pimpc_1.ogg","img":"http://therapboard.com/images/artist/pimpc.png"},
        {"name":"pimpc2","artist":"Pimp C","track":"http://www.therapboard.com/audio/pimpc_sweetjones3.ogg","img":"http://therapboard.com/images/artist/pimpc.png"},
        {"name":"pitbull1","artist":"Pitbull","track":"http://www.therapboard.com/audio/pitbull_1.ogg","img":"http://therapboard.com/images/artist/pitbull.png"},
        {"name":"pitbull2","artist":"Pitbull","track":"http://www.therapboard.com/audio/pitbull_2.ogg","img":"http://therapboard.com/images/artist/pitbull.png"},
        {"name":"pitbull3","artist":"Pitbull","track":"http://www.therapboard.com/audio/pitbull_6.ogg","img":"http://therapboard.com/images/artist/pitbull.png"},
        {"name":"projectpat","artist":"Project Pat","track":"http://www.therapboard.com/audio/projectpat_1.ogg","img":"http://therapboard.com/images/artist/projectpat.png"},
        {"name":"pushat1","artist":"Pusha T","track":"http://www.therapboard.com/audio/pushat_1.ogg","img":"http://therapboard.com/images/artist/pushat.png"},
        {"name":"pushat2","artist":"Pusha T","track":"http://www.therapboard.com/audio/pushat_haha.ogg","img":"http://therapboard.com/images/artist/pushat.png"},
        {"name":"pushat3","artist":"Pusha T","track":"http://www.therapboard.com/audio/pushat_unh.ogg","img":"http://therapboard.com/images/artist/pushat.png"},
        {"name":"raekwon","artist":"Raekwon","track":"http://www.therapboard.com/audio/raekwon_yo.ogg","img":"http://therapboard.com/images/artist/raekwon.png"},
        {"name":"redman","artist":"Redman","track":"http://www.therapboard.com/audio/redman_heyo.ogg","img":"http://therapboard.com/images/artist/redman.png"},
        {"name":"ross1","artist":"Rick Ross","track":"http://www.therapboard.com/audio/ross_1.ogg","img":"http://therapboard.com/images/artist/ross.png"},
        {"name":"ross2","artist":"Rick Ross","track":"http://www.therapboard.com/audio/ross_2.ogg","img":"http://therapboard.com/images/artist/ross.png"},
        {"name":"ross3","artist":"Rick Ross","track":"http://www.therapboard.com/audio/ross_4.ogg","img":"http://therapboard.com/images/artist/ross.png"},
        {"name":"ross3","artist":"Rick Ross","track":"http://www.therapboard.com/audio/ross_woo.ogg","img":"http://therapboard.com/images/artist/ross.png"},
        {"name":"snoop1","artist":"Snoop Dogg","track":"http://www.therapboard.com/audio/snoop_5.ogg","img":"http://therapboard.com/images/artist/snoop.png"},
        {"name":"snoop2","artist":"Snoop Dogg","track":"http://www.therapboard.com/audio/snoop_4.ogg","img":"http://therapboard.com/images/artist/snoop.png"},
        {"name":"snoop3","artist":"Snoop Dogg","track":"http://www.therapboard.com/audio/snoop_1.ogg","img":"http://therapboard.com/images/artist/snoop.png"},
        {"name":"soulja1","artist":"Soulja Boy","track":"http://www.therapboard.com/audio/soulja_4.ogg","img":"http://therapboard.com/images/artist/soulja.png"},
        {"name":"soulja2","artist":"Soulja Boy","track":"http://www.therapboard.com/audio/soulja_5.ogg","img":"http://therapboard.com/images/artist/soulja.png"},
        {"name":"swizz","artist":"Swizz Beatz","track":"http://www.therapboard.com/audio/swizz_1.ogg","img":"http://therapboard.com/images/artist/swizz.png"},
        {"name":"ti1","artist":"T.I.","track":"http://www.therapboard.com/audio/ti_5.ogg","img":"http://therapboard.com/images/artist/ti.png"},
        {"name":"ti2","artist":"T.I.","track":"http://www.therapboard.com/audio/ti_22.ogg","img":"http://therapboard.com/images/artist/ti.png"},
        {"name":"tpain1","artist":"T-Pain","track":"http://www.therapboard.com/audio/tpain_2.ogg", "img":"http://therapboard.com/images/artist/tpain.png"},
        {"name":"tpain2","artist":"T-Pain","track":"http://www.therapboard.com/audio/tpain1.ogg","img":"http://therapboard.com/images/artist/tpain.png"},
        {"name":"treysongz","artist":"Trey Songz","track":"http://www.therapboard.com/audio/treysongz_4.ogg","img":"http://therapboard.com/images/artist/treysongz.png"},
        {"name":"trickdaddy1","artist":"Trick Daddy","track":"http://www.therapboard.com/audio/trick_1.ogg","img":"http://therapboard.com/images/artist/trickdaddy.png"},
        {"name":"trickdaddy2","artist":"Trick Daddy","track":"http://www.therapboard.com/audio/trick_2.ogg","img":"http://therapboard.com/images/artist/trickdaddy.png"},
        {"name":"trickdaddy3","artist":"Trick Daddy","track":"http://www.therapboard.com/audio/trick_4.ogg","img":"http://therapboard.com/images/artist/trickdaddy.png"},
        {"name": "twentyonesavage", "artist": "21 Savage", "track": "http://www.therapboard.com/audio/21savage_21.ogg", "img": "http://therapboard.com/images/artist/21savage.png"},
        {"name":"tyga","artist":"Tyga","track":"http://www.therapboard.com/audio/tyga_unh.ogg","img":"http://therapboard.com/images/artist/tyga.png"},
        {"name":"waka1","artist":"Waka Flocka Flame","track":"http://www.therapboard.com/audio/waka_1.ogg","img":"http://therapboard.com/images/artist/waka.png"},
        {"name":"waka2","artist":"Waka Flocka Flame","track":"http://www.therapboard.com/audio/waka_8.ogg","img":"http://therapboard.com/images/artist/waka.png"},
        {"name":"willsmith1","artist":"Will Smith","track":"http://www.therapboard.com/audio/willsmith_1.ogg","img":"http://therapboard.com/images/artist/willsmith.png"},
        {"name":"willsmith2","artist":"Will Smith","track":"http://www.therapboard.com/audio/willsmith_2.ogg","img":"http://therapboard.com/images/artist/willsmith.png"},
        {"name":"wiz1","artist":"Wiz Khalifa","track":"http://www.therapboard.com/audio/wiz_1.ogg","img":"http://therapboard.com/images/artist/wiz.png"},
        {"name":"wiz2","artist":"Wiz Khalifa","track":"http://www.therapboard.com/audio/wiz_unh.ogg","img":"http://therapboard.com/images/artist/wiz.png"},
        {"name":"jeezy1","artist":"Young Jeezy","track":"http://www.therapboard.com/audio/jeezy_10.ogg","img":"http://therapboard.com/images/artist/jeezy.png"},
        {"name":"jeezy2","artist":"Young Jeezy","track":"http://www.therapboard.com/audio/jeezy_11.ogg","img":"http://therapboard.com/images/artist/jeezy.png"},
        {"name":"jeezy3","artist":"Young Jeezy","track":"http://www.therapboard.com/audio/jeezy_1.ogg","img":"http://therapboard.com/images/artist/jeezy.png"}
      ];
      this.displayedRappers =[]
      this.audioChoice = ''
      this.handlePlayClick = this.handlePlayClick.bind(this)
      this.handleRapperClick = this.handleRapperClick.bind(this)
      this.state = {
        correct: null,
        rapperChoice: {},
        score: 0
      }
  }

  chooseRappers() {
    while(this.displayedRappers.length < 4) {
      let nameArr = this.displayedRappers.map(rapper => rapper.artist)
      let randomRapper = this.rappers[Math.floor(Math.random() * this.rappers.length)]
      console.log('nameArr', nameArr)
      if (!nameArr.includes(randomRapper.artist)) {
        this.displayedRappers.push(randomRapper)
      }
    }
    console.log(this.displayedRappers)
    return this.displayedRappers
  }
  componentDidMount(){
    this.setState({
      rapperChoice: this.displayedRappers[Math.floor(Math.random() * 4)],
    });
  }

  handlePlayClick() {
    console.log('this state', this.state)
    console.log('this.audioChoice', this.audioChoice)
    this.audioChoice.play()
  }

  chooseAudio() {
    this.audioChoice = new Audio(this.state.rapperChoice.track)
  }

  handleRapperClick(event) {
    console.log('event', event.target)
    if(event.target.id === this.state.rapperChoice.name) {
      this.setState({
        correct: true
      })
      this.setState({
        score: this.state.score + 1
      })
    } else {
      this.setState({
        correct: false
      })
    }
  }

  handlePlayAgain() {
    window.location.reload()
  }

  render() {
    console.log('state', this.state)
    return (
    <div>
      <div>
         <Navbar />
         <h2>Score: {this.state.score}</h2>
      </div>
<div id='rappers'>
      {
        this.chooseRappers().map(rapper => (
          <div key={rapper.name}>
          <img className='microphone' src='/microphone.png' />
          <figure > 
            <img id= {rapper.name} src={rapper.img ? rapper.img : 'http://therapboard.com/images/artist/21savage.png'} onClick={this.handleRapperClick}/>
            <figcaption><h4>{rapper.artist}</h4></figcaption>
            </figure>
        </div>
        ))
      }
      {this.chooseAudio()}
</div>
  <div id='playButton'>
      <button type='button'onClick={this.handlePlayClick}>Play!</button>
  </div>
  <p/>
  <p/>
  <p/>
  <p/>
      {
        this.state.correct ?  
          <div id='makeChoice'>
            <div id='correctScreen'>
              <CorrectScreen rapper={this.state.rapperChoice}/> 
            </div>
              <button type='button' id='playAgainButton' onClick={this.handlePlayAgain}>Next!</button>
          </div>
      : 
      <div/>
      }
      {
        this.state.correct === false ? 
        <h1>You Crazy For This One!</h1>
      :
      <div/>      
      }
  </div>
    )
  }

}

export default GameBoard