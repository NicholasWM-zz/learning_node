DROP TABLE IF EXISTS TB_HEROIS;
CREATE TABLE TB_HEROIS (
    ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    NOME TEXT NOT NULL,
    PODER TEXT NOT NULL,
)

-- Insert rows into table 'TB_HEROIS'
INSERT INTO TB_HEROIS
( -- columns to insert data into
 NOME, PODER
)
VALUES
( -- first row: values for the columns in the list above
 'Flash', 'Velocidade'
),
( -- second row: values for the columns in the list above
 'Batman', 'Dinheiro'
)

SELECT * FROM TB_HEROIS
SELECT * FROM TB_HEROIS WHERE NOME='Flash'


UPDATE TB_HEROIS
SET NOME='Goku', PODER='Deus'
WHERE ID=1;


DELETE FROM TB_HEROIS WHERE ID=2;