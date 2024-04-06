-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : mar. 05 déc. 2023 à 11:00
-- Version du serveur : 5.7.39
-- Version de PHP : 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ESCAPE_GAME`
--

-- --------------------------------------------------------

--
-- Structure de la table `Panier`
--

CREATE TABLE `Panier` (
  `id_panier` int(11) NOT NULL,
  `id_utilisateur` int(11) DEFAULT NULL,
  `id_salle` int(11) DEFAULT NULL,
  `reserve` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `Salarie`
--

CREATE TABLE `Salarie` (
  `id_salarie` int(11) NOT NULL,
  `nom` varchar(45) DEFAULT NULL,
  `prenom` varchar(45) DEFAULT NULL,
  `adresse` varchar(150) DEFAULT NULL,
  `tel` int(10) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `mdp` varchar(30) DEFAULT NULL,
  `is_admin` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `Salarie`
--

INSERT INTO `Salarie` (`id_salarie`, `nom`, `prenom`, `adresse`, `tel`, `email`, `mdp`, `is_admin`) VALUES
(1, 'bob', 'bob', 'bobland', 666, 'bob@bob.bob', 'bob', 1);

-- --------------------------------------------------------

--
-- Structure de la table `Salle`
--

CREATE TABLE `Salle` (
  `id_salle` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `titre` varchar(45) NOT NULL,
  `synopsis` longtext NOT NULL,
  `objectif` longtext NOT NULL,
  `photo1` longtext DEFAULT NULL,
  `photo2` longtext DEFAULT NULL,
  `Photo3` longtext ,
  `dure` time NOT NULL,
  `prix` int(11) NOT NULL,
  `dispo_de` time NOT NULL,
  `dispo_jusqua` time NOT NULL,
  `is_chez_vous` tinyint(1) NOT NULL,
  `difficulte` enum('Facile','Intermédiaire','Difficile') NOT NULL
);

--
-- Déchargement des données de la table `Salle`
--

INSERT INTO `Salle` (`id_salle`, `titre`, `synopsis`, `objectif`, `photo1`, `photo2`, `Photo3`, `dure`, `prix`, `dispo_de`, `dispo_jusqua`, `is_chez_vous`, `difficulte`) VALUES
(1, 'Trône de Fer', 'Plongez dans les intrigues de Westeros en tant\nque prétendants au Trône de Fer. Résolvez des énigmes,\ndéjouez des complots et trouvez le chemin vers le trône\npour revendiquer votre droit au pouvoir.', 'Conquérir le Trône de Fer en surmontant\nles obstacles et en résolvant les énigmes dans un décor\ninspiré de Game of Thrones. Le temps presse, l\'hiver\narrive. Êtes-vous prêt à jouer le jeu?', 'https://www.lagardedenuit.com/wall/wp-content/uploads/2030/03/wic_gameover_lyon-2100x1050.jpg', 'https://www.experimenteaza.ro/8868-large_default_landscape/discover-the-escape-room-game-of-thrones-in-brasov.jpg', 'https://fastly.4sqi.net/img/general/width960/398869057__hVirQ5AwjqY7Y-He93n8Of2maiqbiD6Kp9sNgEMkKc.png', '01:30:00', 100, '09:00:00', '00:00:00', 0, NULL),
(2, 'La Quête de Jedi', 'Vous êtes recrutés par la Rébellion pour accomplir une\nmission cruciale dans la lutte contre l\'Empire Galactique.\nVotre destinée vous conduit à travers des planètes\nlointaines et des vaisseaux spatiaux emblématiques.\nL\'avenir de la galaxie dépend de votre succès.', 'Accomplir la Quête du Jedi en résolvant des énigmes\nintergalactiques, en évitant les pièges de l\'Empire, et en\nmaîtrisant la Force. Que la Force soit avec vous dans cette\naventure palpitante à travers l\'univers de Star Wars.', 'https://magicrooms.hu/wp-content/uploads/2022/11/12.jpeg', 'https://www.artesine.fr/images/guide/produits/2015-11/bombe1-114107.jpg', 'https://librerin.files.wordpress.com/2019/06/img_0547.jpg', '01:30:00', 100, '09:00:00', '00:00:00', 0, NULL),
(3, 'L\'épreuve des Sorciers', 'Vous recevez une lettre d\'acceptation à Poudlard et êtes convoqués pour participer à l\'Épreuve des Sorciers. Les mystères et la magie de l\'école de sorcellerie vous attendent, mais attention aux dangers qui guettent dans l\'ombre.', 'Découvrir les secrets cachés de Poudlard, maîtriser des sortilèges complexes, résoudre des énigmes magiques, et échapper aux embûches qui se dressent sur votre chemin. Affrontez l\'Épreuve des Sorciers pour prouver que vous êtes digne de faire partie du monde magique de Harry Potter.', 'https://jai-un-pote-dans-la.com/wp-content/uploads/2019/10/Harry-Potter-escape-game-avec-copyright.jpg', 'https://cherry.img.pmdstatic.net/fit/https.3A.2F.2Fimg.2Eohmymag.2Ecom.2Farticle.2Flifestyle.2Fl-escape-game-harry-potter-de-bordeaux-n-attend-que-vous_8548315026cd229f8183315d65b67fa3aa172206.2Ejpg/640x360/quality/80/l-escape-game-harry-potter-de-bordeaux-n-attend-que-vous.jpg', 'https://cdn-citywonderscom.azureedge.net/media/20727/wizarding-world-of-harry-potter-gryffindor-common-room.jpg', '01:30:00', 100, '09:00:00', '00:00:00', 0, NULL),
(4, 'La Quête d\'Azeroth', 'Vous êtes recrutés par les forces de l\'Alliance et de la Horde pour une mission cruciale dans le monde épique d\'Azeroth. Des mystères anciens et des créatures mythiques vous attendent alors que vous vous lancez dans une quête pour sauver le royaume en péril.', 'Triompher des épreuves des titans, résoudre des énigmes liées aux artefacts légendaires, et combattre les serviteurs des ténèbres. Seul un groupe stratégique et courageux pourra réussir la Quête d\'Azeroth et sauver le monde de World of Warcraft. Êtes-vous prêt à affronter l\'aventure?', 'https://pbs.twimg.com/media/Fiw7jfyXoAg33y9?format=jpg&name=medium', NULL, NULL, '01:30:00', 180, '09:00:00', '00:00:00', 1, NULL),
(5, 'La Légende de l\'Arène', 'Vous êtes invoqués dans l\'arène mythique de Runeterra, où les champions de différentes factions se battent pour la suprématie. Les mystères de l\'Arène et les défis des champions vous attendent. Votre mission : prouver votre valeur et devenir une légende.', 'Affronter des épreuves stratégiques, résoudre des énigmes liées aux pouvoirs des champions, et surmonter les obstacles des différentes voies de l\'Arène. Seul un groupe coordonné et puissant peut espérer émerger en tant que légende de League of Legends. Êtes-vous prêt à relever le défi?', 'https://www.wonderbox.fr/wondermedias/sys_master/productmedias/h2d/hed/1136686-560x373.jpg', NULL, NULL, '01:30:00', 180, '09:00:00', '00:00:00', 1, NULL),
(6, 'Énigmes de l\'Absence', 'Vous entrez dans l\'univers obscur de mystères et de disparitions. Un proche a disparu dans des circonstances énigmatiques, et vous êtes appelés à explorer les indices laissés derrière lui. Chaque pièce de la salle renferme un élément crucial pour résoudre le mystère de sa disparition.', 'Découvrir la vérité derrière la disparition en reliant les indices disséminés dans la salle, démêler les énigmes temporelles et déverrouiller le chemin vers la révélation finale. Le temps presse, chaque minute compte. Serez-vous capable de percer les secrets de l\'Absence et de retrouver votre proche disparu?', 'https://img.over-blog-kiwi.com/0/55/68/57/20181217/ob_bf507f_escape-game-phobia-les-disparus.png', NULL, NULL, '01:30:00', 180, '09:00:00', '00:00:00', 1, NULL),
(7, 'L\'Atelier des Engrenages', 'Vous pénétrez dans un atelier mécanique mystérieux, rempli d\'engrenages, de leviers et de machines complexes. Un inventeur renommé a mystérieusement disparu, laissant derrière lui des énigmes mécaniques et des inventions étranges. Votre mission est de comprendre le fonctionnement de ces mécanismes et de résoudre le mystère qui entoure sa disparition.', 'Naviguer à travers des dispositifs mécaniques sophistiqués, résoudre des puzzles basés sur les principes de la mécanique, et dévoiler les secrets cachés de l\'atelier. Seule une compréhension approfondie des engrenages et des mécanismes vous permettra de résoudre l\'énigme et de découvrir ce qui est arrivé à l\'inventeur. Êtes-vous prêt à relever le défi de l\'Atelier des Engrenages?', 'https://escapegame.imgix.net/images/62/620507b6822cf174129227.jpg?auto=format,compress&ch=Width,DPR&fp-x=0.34&fp-y=0.45&crop=focalpoint&fit=crop&w=2440&h=1168&quot;', 'https://res.cloudinary.com/funbooker/image/upload/ar_4:3,c_fill,dpr_auto,f_auto,q_auto,w_900/v1/marketplace-listing/lkjrjynrg3ye5j8vubtg', 'file:///Users/baptisteharbuz/Desktop/ForEach%20Academy/VS%20Code/EXERCICES/ESCAPE%20GAME/Escape-game-Le-braquage-Rashomon%20-%20copie.jpg', '01:30:00', 180, '09:00:00', '00:00:00', 1, NULL),
(8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '09:00:00', '00:00:00', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `Utilisateur`
--

CREATE TABLE `Utilisateur` (
  `id_utilisateur` int(11) NOT NULL,
  `nom` varchar(45) DEFAULT NULL,
  `prenom` varchar(45) DEFAULT NULL,
  `adresse` varchar(150) DEFAULT NULL,
  `tel` int(10) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `mdp` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `Utilisateur`
--

INSERT INTO `Utilisateur` (`id_utilisateur`, `nom`, `prenom`, `adresse`, `tel`, `email`, `mdp`) VALUES
(1, 'poule', 'poule', 'pouleland', 666, 'poule@poule.poule', 'poule');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Panier`
--
ALTER TABLE `Panier`
  ADD PRIMARY KEY (`id_panier`),
  ADD KEY `id_utilisateur` (`id_utilisateur`),
  ADD KEY `id_salle` (`id_salle`);

--
-- Index pour la table `Salarie`
--
ALTER TABLE `Salarie`
  ADD PRIMARY KEY (`id_salarie`);

--
-- Index pour la table `Salle`
--
ALTER TABLE `Salle`
  ADD PRIMARY KEY (`id_salle`);

--
-- Index pour la table `Utilisateur`
--
ALTER TABLE `Utilisateur`
  ADD PRIMARY KEY (`id_utilisateur`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Panier`
--
ALTER TABLE `Panier`
  MODIFY `id_panier` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `Salarie`
--
ALTER TABLE `Salarie`
  MODIFY `id_salarie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `Salle`
--
ALTER TABLE `Salle`
  MODIFY `id_salle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `Utilisateur`
--
ALTER TABLE `Utilisateur`
  MODIFY `id_utilisateur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Panier`
--
ALTER TABLE `Panier`
  ADD CONSTRAINT `panier_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `Utilisateur` (`id_utilisateur`),
  ADD CONSTRAINT `panier_ibfk_2` FOREIGN KEY (`id_salle`) REFERENCES `Salle` (`id_salle`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;





INSERT INTO `Salle` (`titre`, `synopsis`, `objectif`, `photo1`, `photo2`,
`Photo3`, `dure`, `prix`, `dispo_de`, `dispo_jusqua`, `is_chez_vous`, `difficulte`) VALUES
('Trône de Fer', 'Synopsis', 'objectif', 'Photo1', 'Photo2', 'Photo3', '01:30:00',
 100, '09:00:00', '00:00:00', 0, 1),




CREATE TABLE `Utilisateur` (
  `id_utilisateur` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) NOT NULL,
  `prenom` varchar(45) NOT NULL,
  `adresse` varchar(150) DEFAULT NULL,
  `tel` int(10) DEFAULT NULL,
  `email` varchar(30) NOT NULL,
  `mdp` varchar(100) UNIQUE KEY NOT NULL
);


INSERT INTO `Utilisateur` (`nom`, `prenom`, `adresse`, `tel`, `email`, `mdp`) VALUES
('nom', 'prenom', '1 rue du test', 0123456789, 'contact@test.fr', 'MDP123');




'


CREATE TABLE `Panier` (
  `id_panier` int(11) AUTO_INCREMENT PRIMARY_KEY NOT NULL,
  `id_utilisateur` int(11) DEFAULT NULL,
  `id_salle` int(11) DEFAULT NULL,
  `reserve` datetime DEFAULT NULL
);