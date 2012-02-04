var color_form = {
        current : null,
        colors : [
            'cfb941',
            'cca34b',
            'bc884f',
            'c36620',
            '517432',
            'b8bb6c',
            '9cbc7b',
            '84bea5',
            'a3bb5b',
            '679a4f',
            '357459',
            '3e7f47',
            '1f3523',
            '30332c',
            '343c3e',
            '1b2f26',
            '1e392a',
            '9d3824',
            'b44228',
            'b63a22',
            '9c2022',
            '721b14',
            '7e1c1b',
            '771c25',
            '3c655d',
            '5a8e99',
            '376f80',
            '3c5d7e',
            '446986',
            '5c88a5',
            '4f6191',
            '495d66',
            '314079',
            '5b9acd',
            '0c0f1d',
            '292b40',
            '262535',
            '2f3c70',
            '293a68',
            '734760',
            '433d63' ,
            '805c80',
            '3b3050',
            '261b23',
            '332630',
            'ac7c94',
            'b37978',
            'b77080',
            'b65868',
            'aa454d',
            'b44d6b',
            'bf6f96',
            '944d77',
            '86324a',
            '4a1d32',
            '381114',
            '540d11',
            '561a1c',
            '531f23',
            '371315',
            '4e1b18',
            '452018',
            '673127',
            '40251a',
            '3c3022',
            '43322b',
            '201b1d',
            '896f4e',
            'b27a61',
            'bd9d84',
            'bda28d',
            'd8d0a3',
            'e6e2e1',
            'aeaeae',
            '82878d',
            'b8c6c9',
            '7a7f83',
            '5b646b',
            '343d42',
            '282e2e',
            '232323',
            '190d11',
            '000000'
            
        ],
        pos : [6,13,22,32,40,50,58,66,76,87,92,101,110,119,127,135,143,151,160,168,176,185,195,203,212,222,232,243,252,261,271,280,290,300,309,319,330,340,347,357,366,376,386,396,404,412,422,431,440,450,458,467,476,485,496,507,514,523,533,543,553,561,572,581,592,602,611,620,629,639,649,660,671,680,690,701,711,720,731,741,751,761,769],
        sections : [
            {
               title: 'Past',
               desc: 'If your Primary Color for the question does not quite fulfill your answer you may choose up to three more colors.',
               questions : [
                  'What Color touched you as you were born?',
                  'This Color describes your early years.',
                  'These Colors relate to your uniqueness.',
                  'Choose the Color you would like to color all your dreams.',
                  'What Colors speak of your challenges?',
                  'What Colors to you represent Change?',
                  'What Colors that entice you?'
               ]
            },
            {
               title: 'Present',
               desc: 'Next Please Choose 4 Colors',
               questions : [
                  'Colors of implementation.',
                  'Colors that give me a sense of fulfillment.',
                  'The Color you feel at this moment if you could you would become.',
                  'What Color is calling you today?',
               ]
            },
            {
               title: 'Future',
               desc: 'Next Please Choose 4 Colors',
               questions : [
                  'A Color that will elevate your thinking.',
                  'This Color brings understanding.',
                  'Within this Color I feel security.',
                  'My spiritual wisdom, and mental integrity is released through these Colors.',
                  'I value this Color ',
                  'INTELLECTUAL ACTIVITY',
                  'PHYSICAL HEALTH',
                  'SPIRITUAL ATTUNEMENT',
                  'EMOTIONAL BALANCE'
               ]
            },
        ],
        contact : [
            {
                name : 'full_name',
                type : 'text',
                required : true
            },
            {
                name : 'birthday',
                type : 'text',
                required : false
            },
            {
                name : 'birth_time',
                type : 'text',
                required : false
            },
            {
                name : 'telephone',
                type : 'text',
                required : false
                
            },
            {
                name : 'email',
                type : 'text',
                required : true
            }
        ],
        data : [],
    };